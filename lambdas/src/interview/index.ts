import { APIGatewayProxyEventV2 } from "aws-lambda";
import { CreateVisionController } from "./contorllers/create-vision";
import { getOpenAiClient } from "./get-openai-client";

export const handler = async (event: APIGatewayProxyEventV2) => {
  const body = JSON.parse(event.body ?? "");

  const openai = await getOpenAiClient();

  const controller = new CreateVisionController(openai);

  const result = await controller.execute({
    messages: body.messages,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
