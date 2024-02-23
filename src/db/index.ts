import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import { env } from "@/lib/env";
import * as schema from "./schema";

const client = new Client({
  connectionString: env.POSTGRES_URL,
  connectionTimeoutMillis: 10000,
});

await client.connect();
export const db = drizzle(client, { schema });
