import "dotenv/config";

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.ts";
import foodRoutes from "./routes/foodRoutes.ts";

const app = express();
app.use(cors());
app.use(express.json());

// Mount your routes
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);

const port = Number(process.env.PORT) || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
