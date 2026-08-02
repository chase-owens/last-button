import {
  Client,
  StreamableHTTPClientTransport,
} from "@modelcontextprotocol/client";

const DEFAULT_SERVER_URL =
  "https://slbsiocdd8.execute-api.us-east-1.amazonaws.com/mcp";

const GOAL_ANALYSIS_RESOURCE =
  "constructional-interview://methodology/goal-analysis";

let methodologyPromise: Promise<string> | undefined;

async function loadConstructionalGoalAnalysis(): Promise<string> {
  const serverUrl = process.env.MCP_SERVER_URL ?? DEFAULT_SERVER_URL;

  const client = new Client({
    name: "last-button",
    version: "1.0.0",
  });

  const transport = new StreamableHTTPClientTransport(new URL(serverUrl));

  try {
    await client.connect(transport);

    const response = await client.readResource({
      uri: GOAL_ANALYSIS_RESOURCE,
    });

    const content = response.contents[0];

    if (!content) {
      throw new Error("Constructional Goal Analysis returned no content.");
    }

    if (!("text" in content)) {
      throw new Error(
        "Constructional Goal Analysis did not return text content.",
      );
    }

    return content.text;
  } finally {
    await client.close();
  }
}

export function getConstructionalGoalAnalysis(): Promise<string> {
  methodologyPromise ??= loadConstructionalGoalAnalysis().catch((error) => {
    methodologyPromise = undefined;
    throw error;
  });

  return methodologyPromise;
}
