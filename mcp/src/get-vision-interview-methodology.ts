import {
  Client,
  StreamableHTTPClientTransport,
} from "@modelcontextprotocol/client";

const DEFAULT_SERVER_URL =
  "https://slbsiocdd8.execute-api.us-east-1.amazonaws.com/mcp";

const VISION_INTERVIEW_RESOURCES = [
  {
    name: "Constructional Goal Analysis",
    uri: "constructional-interview://methodology/goal-analysis",
  },
  {
    name: "Constructional Goal Analysis",
    uri: "constructional-interview://interview/overview",
  },
  {
    name: "Constructional Goal Analysis",
    uri: "constructional-interview://interview/principles",
  },
  {
    name: "Constructional Goal Analysis",
    uri: "constructional-interview://interview/outcomes",
  },
  {
    name: "Constructional Goal Analysis",
    uri: "constructional-interview://interview/scope-and-boundaries",
  },
] as const;

let methodologyPromise: Promise<string> | undefined;

type ResourceContent = { text?: string };

const getTextContent = (
  resourceName: string,
  contents: ResourceContent[],
): string => {
  const textParts = contents
    .filter(
      (content): content is ResourceContent & { text: string } =>
        typeof content.text === "string",
    )
    .map((content) => content.text.trim())
    .filter(Boolean);

  if (textParts.length === 0) {
    throw new Error(`${resourceName} did not return text content.`);
  }

  return textParts.join("\n\n");
};

async function loadVisionInterviewMethodology(): Promise<string> {
  const serverUrl = process.env.MCP_SERVER_URL ?? DEFAULT_SERVER_URL;

  const client = new Client({
    name: "last-button",
    version: "1.0.0",
  });

  const transport = new StreamableHTTPClientTransport(new URL(serverUrl));

  try {
    await client.connect(transport);

    const resources: string[] = [];

    for (const { name, uri } of VISION_INTERVIEW_RESOURCES) {
      const response = await client.readResource({ uri });

      const textContent = getTextContent(
        name,
        response.contents as ResourceContent[],
      );

      resources.push(`# ${name}\n\n${textContent}`);
    }
    return resources.join("\n\n---\n\n");
  } finally {
    await client.close();
  }
}

export function getVisionInterviewMethodology(): Promise<string> {
  methodologyPromise ??= loadVisionInterviewMethodology().catch((error) => {
    methodologyPromise = undefined;
    throw error;
  });

  return methodologyPromise;
}
