import { APIGatewayProxyEventV2 } from "aws-lambda";

import { CreateVisionController } from "./controllers/create-vision";
import { getOpenAiClient } from "./get-openai-client";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const body = JSON.parse(event.body ?? "{}");

    const openai = await getOpenAiClient();
    const controller = new CreateVisionController(openai);

    const result = await controller.execute({
      messages: body.messages,
    });

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      }),
    };
  }
};
