import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import type {
  InterviewRecord,
  InterviewProcessingStatus,
} from "../types.js";

type CompleteInterviewInput = {
  result: NonNullable<InterviewRecord["result"]>;
  updatedAt: string;
};

type FailInterviewInput = {
  errorMessage: string;
  updatedAt: string;
};

export class InterviewRepository {
  constructor(
    private readonly documentClient: DynamoDBDocumentClient,
    private readonly tableName: string,
  ) {}

  async create(record: InterviewRecord): Promise<void> {
    await this.documentClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: record,
        ConditionExpression: "attribute_not_exists(interviewId)",
      }),
    );
  }

  async get(interviewId: string): Promise<InterviewRecord | undefined> {
    const response = await this.documentClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { interviewId },
        ConsistentRead: true,
      }),
    );

    return response.Item as InterviewRecord | undefined;
  }

  async complete(
    interviewId: string,
    input: CompleteInterviewInput,
  ): Promise<void> {
    await this.documentClient.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { interviewId },
        UpdateExpression:
          "SET processingStatus = :processingStatus, #result = :result, updatedAt = :updatedAt REMOVE errorMessage",
        ExpressionAttributeNames: {
          "#result": "result",
        },
        ExpressionAttributeValues: {
          ":processingStatus": "complete" satisfies InterviewProcessingStatus,
          ":result": input.result,
          ":updatedAt": input.updatedAt,
        },
        ConditionExpression: "attribute_exists(interviewId)",
      }),
    );
  }

  async fail(
    interviewId: string,
    input: FailInterviewInput,
  ): Promise<void> {
    await this.documentClient.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { interviewId },
        UpdateExpression:
          "SET processingStatus = :processingStatus, errorMessage = :errorMessage, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":processingStatus": "failed" satisfies InterviewProcessingStatus,
          ":errorMessage": input.errorMessage,
          ":updatedAt": input.updatedAt,
        },
        ConditionExpression: "attribute_exists(interviewId)",
      }),
    );
  }
}
