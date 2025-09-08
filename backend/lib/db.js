import { createClient } from "@libsql/client";
import dotenv from "dotenv";
// Loading env vars
dotenv.config();

// Setting up database connection
const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_AUTH,
});
