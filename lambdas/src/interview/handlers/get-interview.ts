import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

import { interviewRepository } from "../shared/interview-dependencies.js";
import type { PollInterviewResponse } from "../types.js";

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

export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const interviewId = event.pathParameters?.interviewId;

  if (!interviewId) {
    return jsonResponse(400, {
      message: "interviewId is required.",
    });
  }

  try {
    const interview = await interviewRepository.get(interviewId);

    if (!interview) {
      return jsonResponse(404, {
        message: "Interview not found.",
      });
    }

    const response: PollInterviewResponse = {
      interviewId: interview.interviewId,
      processingStatus: interview.processingStatus,
      result: interview.result,
      errorMessage: interview.errorMessage,
      updatedAt: interview.updatedAt,
    };

    return jsonResponse(200, response);
  } catch (error) {
    console.error("Get interview failed.", {
      interviewId,
      error,
    });

    return jsonResponse(500, {
      message: "The interview status could not be loaded.",
    });
  }
};
