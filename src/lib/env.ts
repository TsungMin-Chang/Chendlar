import { z } from "zod";

const envSchema = z.object({
  POSTGRES_URL: z.string().url(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = {
  POSTGRES_URL: process.env.POSTGRES_URL!,
  AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID!,
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET!,
};

envSchema.parse(env);
