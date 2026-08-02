import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod.mjs";

import { createVisionResponseSchema } from "@last-button/domain";
import { getConstructionalGoalAnalysis } from "@last-button/mcp";

import { restaurantInstructions } from "../prompts/restaurantInstructions.js";

type InterviewMessage = {
  role: "coach" | "user";
  content: string;
};

export type CreateVisionRequest = {
  messages: InterviewMessage[];
};

const toResponseInput = (
  messages: InterviewMessage[],
): OpenAI.Responses.ResponseInput =>
  messages.map((message) => ({
    type: "message",
    role: message.role === "coach" ? "assistant" : "user",
    content: [
      {
        type: "input_text",
        text: message.content,
      },
    ],
  }));

export class CreateVisionController {
  constructor(private readonly openai: OpenAI) {}

  async execute(request: CreateVisionRequest) {
    const methodology = await getConstructionalGoalAnalysis();

    const response = await this.openai.responses.parse({
      model: "gpt-5",
      input: [
        {
          type: "message",
          role: "system",
          content: [
            {
              type: "input_text",
              text: `${methodology}

${restaurantInstructions}`,
            },
          ],
        },
        ...toResponseInput(request.messages),
      ],
      text: {
        format: zodTextFormat(
          createVisionResponseSchema,
          "create_vision_response",
        ),
      },
    });

    if (!response.output_parsed) {
      throw new Error("OpenAI returned no parsed interview response.");
    }

    return response.output_parsed.result;
  }
}
