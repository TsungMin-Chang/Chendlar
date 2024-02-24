import { z } from "zod";

// GET
export const getAffairsRequestSchema = z.object({
  userId: z.string().uuid(),
  dateString: z.string().max(20),
});
export type GetAffairsRequest = z.infer<typeof getAffairsRequestSchema>;

// POST
export const postAffairRequestSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().max(50),
  color: z.string().max(10),
  type: z.string().max(10),
  time1: z.date(),
  time2: z.date(),
  isDone: z.boolean(),
});
export type PostAffairRequest = z.infer<typeof postAffairRequestSchema>;

// DELETE
export const deleteAffairRequestSchema = z.object({
  affairId: z.string().uuid(),
});
export type DeleteAffairRequest = z.infer<typeof deleteAffairRequestSchema>;
