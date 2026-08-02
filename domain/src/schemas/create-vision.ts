import z from "zod";

import { restaurantVisionSchema } from "./restaurant-target-outcome.js";

const createVisionResultSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("continue"),
    coachMessage: z.string(),
  }),

  z.object({
    status: z.literal("authentication_required"),
    coachMessage: z.string(),
  }),

  z.object({
    status: z.literal("complete"),
    coachMessage: z.string(),
    vision: restaurantVisionSchema,
  }),
]);

export const createVisionResponseSchema = z.object({
  result: createVisionResultSchema,
});

export type CreateVisionResponse = z.infer<typeof createVisionResponseSchema>;

export type CreateVisionResult = z.infer<typeof createVisionResultSchema>;
