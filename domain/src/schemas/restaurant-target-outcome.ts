import { z } from "zod";

export const restaurantVisionSchema = z.object({
  initialConcern: z
    .string()
    .describe("The operator's original description of what needs to change."),

  accomplishment: z
    .string()
    .describe(
      "What the restaurant would accomplish if this interaction, pattern, or procedure were working well.",
    ),

  operationalPattern: z
    .string()
    .describe(
      "A concise description of the interaction, pattern, or procedure the restaurant intends to establish.",
    ),

  participants: z
    .array(z.string())
    .min(1)
    .describe(
      "The roles involved, such as host, server, manager, kitchen, or guest.",
    ),

  context: z.object({
    location: z.string().nullable().describe("Where the pattern occurs."),

    timing: z
      .string()
      .nullable()
      .describe("When or at what point in service it occurs."),

    situation: z
      .string()
      .nullable()
      .describe("The operational conditions under which it should occur."),

    cues: z
      .array(z.string())
      .describe(
        "Observable events or conditions that should initiate the pattern.",
      ),
  }),

  intendedSequence: z
    .array(
      z.object({
        order: z.number().int().positive(),
        actor: z.string(),
        action: z.string(),
        result: z.string().nullable(),
      }),
    )
    .min(1)
    .describe("The intended observable sequence of actions and interactions."),

  observableFeatures: z
    .array(z.string())
    .min(1)
    .describe(
      "What someone could directly see or hear when the pattern is occurring.",
    ),

  successCriteria: z
    .array(
      z.object({
        measure: z.string(),
        standard: z.string(),
      }),
    )
    .describe(
      "The conditions used to determine whether the intended pattern occurred successfully.",
    ),

  acceptableVariations: z
    .array(z.string())
    .describe("Variations that are still considered successful execution."),

  boundaries: z
    .array(z.string())
    .describe(
      "Behaviors or outcomes that would not count as successful execution.",
    ),

  visionStatement: z
    .string()
    .describe(
      "A concise, operator-facing summary of the intended operational pattern.",
    ),
});

export type RestaurantVision = z.infer<typeof restaurantVisionSchema>;
