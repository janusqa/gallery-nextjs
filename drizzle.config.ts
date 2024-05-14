import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "aws-data-api",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
    // host: env.POSTGRES_HOST,
    // user: env.POSTGRES_USER,
    // password: env.POSTGRES_PASSWORD,
    // database: env.POSTGRES_DATABASE,
    // ssl: true,
  },
  tablesFilter: ["t3gallery_*"],
} satisfies Config;
