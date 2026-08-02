import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import * as cdk from "aws-cdk-lib/core";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import { HttpUserPoolAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as cognito from "aws-cdk-lib/aws-cognito";
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
  public readonly visionsTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create userpool permit create account
    const clientUserPool = new cognito.UserPool(this, "LastButtonUserPool", {
      userPoolName: "last-button-client-pool",
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
    });

    clientUserPool.addDomain("LastButtonCognitoDomain", {
      cognitoDomain: { domainPrefix: "last-button-client" },
    });

    const clientUserPoolClient = clientUserPool.addClient(
      "LastButtonUserPoolClient",
      {
        authFlows: { userPassword: true, userSrp: true },
        generateSecret: false,
      },
    );

    const visionRouteAuthorizer = new HttpUserPoolAuthorizer(
      "LastButtonClientAuthorizer",
      clientUserPool,
      { userPoolClients: [clientUserPoolClient] },
    );

    // create openai secretarn
    const openAiSecret = secretsmanager.Secret.fromSecretNameV2(
      this,
      "LastButtonOpenAiSecret",
      "last-button/openai",
    );

    // create interviews table
    this.visionsTable = new dynamodb.Table(this, "LastButtonVisionTable", {
      tableName: "last-button-visions-table",
      partitionKey: {
        name: "interviewId",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    this.visionsTable.addGlobalSecondaryIndex({
      indexName: "userId-updatedAt-index",
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "updatedAt", type: dynamodb.AttributeType.STRING },
    });

    // create interview lambda
    const interviewLambda = createNodeLambda(
      this,
      "LastButtonInterviewLambda",
      {
        functionName: "last-button-interview",
        entry: path.join(lambdaProjectRoot, "src/interview/index.ts"),
        environment: {
          OPENAI_SECRET_ARN: openAiSecret.secretArn,
          MCP_SERVER_URL:
            "https://slbsiocdd8.execute-api.us-east-1.amazonaws.com/mcp",
        },
      },
      this.visionsTable.tableName,
    );

    this.visionsTable.grantReadWriteData(interviewLambda);
    openAiSecret.grantRead(interviewLambda);

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
            apigatewayv2.CorsHttpMethod.OPTIONS,
          ],
        },
      },
    );

    interviewApi.addRoutes({
      path: "/interviews",
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration(
        "InterviewIntegration",
        interviewLambda,
      ),
    });

    // ensure - user data - sign up - in order to use the tool
    // last time - we had a poll worker - maybe this time we use SQS to update backend to make a call?

    new cdk.CfnOutput(this, "InterviewApiUrl", {
      value: interviewApi.apiEndpoint,
    });

    new cdk.CfnOutput(this, "ClientCognitoAuthority", {
      value: clientUserPool.userPoolProviderUrl,
    });

    new cdk.CfnOutput(this, "ClientCognitoClientId", {
      value: clientUserPoolClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, "ClientCognitoUserPoolId", {
      value: clientUserPool.userPoolId,
    });

    new cdk.CfnOutput(this, "ClientCognitoDomain", {
      value: `https://last-button-client.auth.${this.region}.amazoncognito.com`,
    });
  }
}
