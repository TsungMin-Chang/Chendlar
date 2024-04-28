import { z } from "zod";

// GET months
export const getMonthsRequestSchema = z.object({
  monthNumber: z.number(),
  userId: z.string().uuid(),
});
export type GetMonthsRequest = z.infer<typeof getMonthsRequestSchema>;

// GET weeks
export const getWeeksRequestSchema = z.object({
  weekNumber: z.number(),
  userId: z.string().uuid(),
});
export type GetWeeksRequest = z.infer<typeof getWeeksRequestSchema>;

// POST Affair
export const postAffairRequestSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().max(20),
  color: z.string().max(8),
  type: z.string().max(8),
  time1: z.date(),
  time2: z.date(),
  isDone: z.boolean(),
});
export type PostAffairRequest = z.infer<typeof postAffairRequestSchema>;

// UPDATE Affair
export const updateAffairRequestSchema = postAffairRequestSchema.extend({
  affairId: z.string().uuid(),
  prevType: z.string().max(8),
  prevTitle: z.string().max(20),
  prevOrder: z.number(),
  prevTime1: z.date(),
  prevTime2: z.date(),
});
export type UpdateAffairRequest = z.infer<typeof updateAffairRequestSchema>;

// POST Card
export const postCardRequestSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().max(32),
});
export type PostCardRequest = z.infer<typeof postCardRequestSchema>;

// Update Card
export const updateCardRequestSchema = z.object({
  name: z.string().max(32),
  prevName: z.string().max(32),
});
export type UpdateCardRequest = z.infer<typeof updateCardRequestSchema>;
