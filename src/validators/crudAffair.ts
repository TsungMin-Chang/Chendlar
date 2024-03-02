import { z } from "zod";

// GET day - use server side component
// export const getDayRequestSchema = z.object({
//   userId: z.string().uuid(),
//   dateString: z.string().max(20),
// });
// export type GetDayRequest = z.infer<typeof getDayRequestSchema>;

// GET month
export const getMonthsRequestSchema = z.object({
  year: z.number(),
  month: z.number(),
  userId: z.string().uuid(),
});
export type GetMonthsRequest = z.infer<typeof getMonthsRequestSchema>;

// GET week
export const getWeeksRequestSchema = z.object({
  weekNumber: z.number(),
  userId: z.string().uuid(),
});
export type GetWeeksRequest = z.infer<typeof getWeeksRequestSchema>;

// POST and UPDATE
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
