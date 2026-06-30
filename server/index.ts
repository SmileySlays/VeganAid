import "dotenv/config";
import express from "express";
import cors from "cors";
import { pool } from "./db.ts";
import userRoutes from "./routes/userRoutes.ts";
import foodRoutes from "./routes/foodRoutes.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);

const port = Number(process.env.PORT) || 5000;

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id         SERIAL PRIMARY KEY,
      auth0_id   TEXT UNIQUE NOT NULL,
      email      TEXT NOT NULL,
      name       TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS user_foods (
      id               SERIAL PRIMARY KEY,
      user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      food_fdc_id      INTEGER,
      food_description TEXT NOT NULL,
      quantity         NUMERIC NOT NULL DEFAULT 1,
      nutrients        JSONB DEFAULT '[]',
      created_at       TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log("Database tables ready.");
}

migrate()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  });

export default app;
