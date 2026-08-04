import { CreateVisionController } from "../controllers/create-vision.js";
import { getOpenAiClient } from "../get-openai-client.js";
import { interviewRepository } from "../shared/interview-dependencies.js";
import type { ProcessInterviewEvent } from "../types.js";

export const handler = async (event: ProcessInterviewEvent): Promise<void> => {
  try {
    const interview = await interviewRepository.get(event.interviewId);

    if (!interview) {
      throw new Error(`Interview ${event.interviewId} was not found.`);
    }

    // Async Lambda delivery can retry.
    // Do not regenerate an already completed result.
    if (interview.processingStatus === "complete") {
      return;
    }

    const openai = await getOpenAiClient();
    const createVisionController = new CreateVisionController(openai);

    const result = await createVisionController.execute({
      messages: interview.messages,
    });

    await interviewRepository.complete(event.interviewId, {
      result,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Vision generation failed.";

    console.error("Process interview failed.", {
      interviewId: event.interviewId,
      error,
    });

    try {
      await interviewRepository.fail(event.interviewId, {
        errorMessage,
        updatedAt: new Date().toISOString(),
      });
    } catch (repositoryError) {
      console.error("Failed to mark interview as failed.", {
        interviewId: event.interviewId,
        repositoryError,
      });
    }

    throw error;
  }
};
