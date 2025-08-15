import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // Database dialect
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
  // Path to your schema file(s)
  schema: "./src/db/schema.ts",  // <-- make sure this file exists

});
