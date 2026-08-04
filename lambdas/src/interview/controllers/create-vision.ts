import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod.mjs";

import { createVisionResponseSchema } from "@last-button/domain";
import { getVisionInterviewMethodology } from "@last-button/mcp";

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
  messages.map((message): OpenAI.Responses.EasyInputMessage => ({
    role: message.role === "coach" ? "assistant" : "user",
    content: message.content,
  }));

export class CreateVisionController {
  constructor(private readonly openai: OpenAI) {}

  async execute(request: CreateVisionRequest) {
    const interviewMethodology = await getVisionInterviewMethodology();

    const response = await this.openai.responses.parse({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: `
The following resources define the governing Constructional Interview methodology.

${interviewMethodology}

# Restaurant Domain Instructions

${restaurantInstructions}`.trim(),
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
