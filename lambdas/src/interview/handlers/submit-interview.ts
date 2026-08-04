import {
  InvocationType,
  InvokeCommand,
  LambdaClient,
} from "@aws-sdk/client-lambda";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { randomUUID } from "node:crypto";

import { interviewRepository } from "../shared/interview-dependencies.js";
import type {
  InterviewMessage,
  ProcessInterviewEvent,
  SubmitInterviewRequest,
  SubmitInterviewResponse,
} from "../types.js";

const lambdaClient = new LambdaClient({});

const workerFunctionName = process.env.INTERVIEW_WORKER_FUNCTION_NAME;

if (!workerFunctionName) {
  throw new Error("INTERVIEW_WORKER_FUNCTION_NAME is required.");
}

const jsonResponse = (
  statusCode: number,
  body: unknown,
): APIGatewayProxyResultV2 => ({
  statusCode,
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify(body),
});

const isInterviewMessage = (
  value: unknown,
): value is InterviewMessage => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const message = value as Record<string, unknown>;

  return (
    (message.role === "coach" || message.role === "user") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0
  );
};

const parseRequest = (
  event: APIGatewayProxyEventV2,
): SubmitInterviewRequest => {
  if (!event.body) {
    throw new Error("Request body is required.");
  }

  const parsed = JSON.parse(event.body) as Record<string, unknown>;

  if (
    !Array.isArray(parsed.messages) ||
    parsed.messages.length === 0 ||
    !parsed.messages.every(isInterviewMessage)
  ) {
    throw new Error("messages must be a non-empty interview message array.");
  }

  return {
    messages: parsed.messages,
  };
};

export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  try {
    const request = parseRequest(event);
    const interviewId = randomUUID();
    const now = new Date().toISOString();

    await interviewRepository.create({
      interviewId,
      messages: request.messages,
      processingStatus: "processing",
      createdAt: now,
      updatedAt: now,
    });

    const workerEvent: ProcessInterviewEvent = {
      interviewId,
    };

    await lambdaClient.send(
      new InvokeCommand({
        FunctionName: workerFunctionName,
        InvocationType: InvocationType.Event,
        Payload: Buffer.from(JSON.stringify(workerEvent)),
      }),
    );

    const response: SubmitInterviewResponse = {
      interviewId,
      processingStatus: "processing",
    };

    return jsonResponse(202, response);
  } catch (error) {
    console.error("Submit interview failed.", error);

    return jsonResponse(400, {
      message:
        error instanceof Error
          ? error.message
          : "The interview could not be submitted.",
    });
  }
};
