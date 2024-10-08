import { z } from "zod";

// GET months
export const getMonthsRequestSchema = z.object({
  monthNumber: z.number(),
  userId: z.string().uuid(),
});
export type GetMonthsRequest = z.infer<typeof getMonthsRequestSchema>;

// POST Affair
export const postAffairRequestSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().max(64),
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
  prevTitle: z.string().max(64),
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

// POST Memos
export const NewMemo = z.object({
  userId: z.string().uuid(),
  cardName: z.string().max(32),
  title: z.string().max(64),
  description: z.string().max(128),
});
export const postMemosRequestSchema = z.array(NewMemo);
export type PostMemosRequest = z.infer<typeof postMemosRequestSchema>;

// Update Memos
export const DbMemo = NewMemo.omit({ userId: true }).extend({
  id: z.string().uuid(),
});
export const updateMemosRequestSchema = z.array(DbMemo);
export type UpdateMemosRequest = z.infer<typeof updateMemosRequestSchema>;

// POST Spending
export const postSpendingRequestSchema = z.object({
  title: z.string().max(64),
  tw: z.number(),
  kor: z.number(),
});
export type PostSpendingRequest = z.infer<typeof postSpendingRequestSchema>;

// UPDATE Spending
export const updateSpendingRequestSchema = postSpendingRequestSchema.extend({
  id: z.string().uuid(),
});
export type UpdateSpendingRequest = z.infer<typeof updateSpendingRequestSchema>;
