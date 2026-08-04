import type { CreateVisionResult } from "@last-button/domain";

export type InterviewMessage = {
  role: "coach" | "user";
  content: string;
};

export type InterviewProcessingStatus =
  | "processing"
  | "complete"
  | "failed";

export type InterviewRecord = {
  interviewId: string;
  messages: InterviewMessage[];
  processingStatus: InterviewProcessingStatus;
  result?: CreateVisionResult;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProcessInterviewEvent = {
  interviewId: string;
};

export type SubmitInterviewRequest = {
  messages: InterviewMessage[];
};

export type SubmitInterviewResponse = {
  interviewId: string;
  processingStatus: "processing";
};

export type PollInterviewResponse = {
  interviewId: string;
  processingStatus: InterviewProcessingStatus;
  result?: CreateVisionResult;
  errorMessage?: string;
  updatedAt: string;
};
