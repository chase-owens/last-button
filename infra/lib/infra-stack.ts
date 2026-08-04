import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import * as cdk from "aws-cdk-lib/core";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import path from "path";
import { Construct } from "constructs";

const repoRoot = path.join(__dirname, "../..");
const lambdaProjectRoot = path.join(repoRoot, "lambdas");

const createNodeLambda = (
  scope: Construct,
  id: string,
  props: NodejsFunctionProps,
  tableName = "last-button-visions-table",
) =>
  new NodejsFunction(scope, id, {
    runtime: lambda.Runtime.NODEJS_22_X,
    architecture: lambda.Architecture.ARM_64,
    memorySize: 256,
    projectRoot: repoRoot,
    depsLockFilePath: path.join(repoRoot, "package-lock.json"),
    handler: "handler",
    timeout: cdk.Duration.seconds(120),
    bundling: {
      minify: true,
      sourceMap: true,
    },
    ...props,
    environment: {
      TABLE_NAME: tableName,
      LOG_LEVEL: "INFO",
      ...(props.environment ?? {}),
    },
  });

export class InfraStack extends cdk.Stack {
  public readonly visionsTable: dynamodb.ITable;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create openai secretarn
    const openAiSecret = secretsmanager.Secret.fromSecretNameV2(
      this,
      "LastButtonOpenAiSecret",
      "last-button/openai",
    );

    // create interviews table
    this.visionsTable = dynamodb.Table.fromTableName(
      this,
      "LastButtonVisionTable",
      "last-button-visions-table",
    );

    // create interview lambda
    // Worker: performs the slow MCP + OpenAI work
    const interviewWorkerLambda = createNodeLambda(
      this,
      "LastButtonInterviewWorkerLambda",
      {
        functionName: "last-button-interview-worker",
        entry: path.join(
          lambdaProjectRoot,
          "src/interview/handlers/process-interview.ts",
        ),
        memorySize: 512,
        timeout: cdk.Duration.seconds(120),
        environment: {
          OPENAI_SECRET_ARN: openAiSecret.secretArn,
          MCP_SERVER_URL:
            "https://slbsiocdd8.execute-api.us-east-1.amazonaws.com/mcp",
        },
      },
      this.visionsTable.tableName,
    );

    // Submit: saves the request and asynchronously invokes the worker
    const submitInterviewLambda = createNodeLambda(
      this,
      "LastButtonSubmitInterviewLambda",
      {
        functionName: "last-button-submit-interview",
        entry: path.join(
          lambdaProjectRoot,
          "src/interview/handlers/submit-interview.ts",
        ),
        timeout: cdk.Duration.seconds(15),
        environment: {
          INTERVIEW_WORKER_FUNCTION_NAME: interviewWorkerLambda.functionName,
        },
      },
      this.visionsTable.tableName,
    );

    // Poller: returns processing status and the finished result
    const getInterviewLambda = createNodeLambda(
      this,
      "LastButtonGetInterviewLambda",
      {
        functionName: "last-button-get-interview",
        entry: path.join(
          lambdaProjectRoot,
          "src/interview/handlers/get-interview.ts",
        ),
        timeout: cdk.Duration.seconds(10),
      },
      this.visionsTable.tableName,
    );

    // Submit creates the initial processing record
    this.visionsTable.grantWriteData(submitInterviewLambda);

    // Worker reads the interview and writes the result
    this.visionsTable.grantReadWriteData(interviewWorkerLambda);

    // Poller only reads the current state
    this.visionsTable.grantReadData(getInterviewLambda);

    // Submit Lambda may asynchronously invoke the worker
    interviewWorkerLambda.grantInvoke(submitInterviewLambda);

    // Worker needs the OpenAI secret
    openAiSecret.grantRead(interviewWorkerLambda);

    // create api
    const interviewApi = new apigatewayv2.HttpApi(
      this,
      "LastButtonInterviewApi",
      {
        apiName: "last-button-interview-api",
        corsPreflight: {
          allowOrigins: [
            "http://localhost:5173",
            "https://thatlastbutton.com",
            "https://www.thatlastbutton.com",
          ],
          allowHeaders: ["content-type", "authorization"],
          allowMethods: [
            apigatewayv2.CorsHttpMethod.POST,
            apigatewayv2.CorsHttpMethod.GET,
            apigatewayv2.CorsHttpMethod.OPTIONS,
          ],
        },
      },
    );

    interviewApi.addRoutes({
      path: "/interviews",
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration(
        "SubmitInterviewIntegration",
        submitInterviewLambda,
      ),
    });

    interviewApi.addRoutes({
      path: "/interviews/{interviewId}",
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration(
        "GetInterviewIntegration",
        getInterviewLambda,
      ),
    });

    new cdk.CfnOutput(this, "InterviewApiUrl", {
      value: interviewApi.apiEndpoint,
    });
  }
}
