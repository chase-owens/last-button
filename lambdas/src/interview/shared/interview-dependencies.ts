import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { InterviewRepository } from "../repositories/interview-repository.js";

const tableName = process.env.TABLE_NAME;

if (!tableName) {
  throw new Error("TABLE_NAME is required.");
}

const dynamoClient = new DynamoDBClient({});

const documentClient = DynamoDBDocumentClient.from(dynamoClient, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const interviewRepository = new InterviewRepository(
  documentClient,
  tableName,
);
