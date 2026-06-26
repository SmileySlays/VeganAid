import { Router } from "express";
import { pool } from "../db.ts";
import {
  getFoodByIdService,
  getFoodsByUserIdService,
  updateFoodService,
  deleteFoodService,
} from "../services/userFoodService.ts";

const router = Router();

router.post("/", async (req, res) => {
  console.log("POST /api/foods hit", req.body);
  try {
    const { auth0_id, food_fdc_id, food_description, calories, nutrients } =
      req.body;

    if (!auth0_id) {
      return res.status(400).json({ error: "Missing auth0_id" });
    }

    const userResult = await pool.query(
      `SELECT id FROM users WHERE auth0_id = $1`,
      [auth0_id],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userResult.rows[0].id;

    const result = await pool.query(
      `INSERT INTO user_foods
       (user_id, food_fdc_id, food_description, calories, nutrients)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        userId,
        food_fdc_id ?? null,
        food_description,
        calories,
        JSON.stringify(nutrients ?? []),
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Add food error:", err);
    res.status(500).json({ error: "Failed to add food" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const query = (req.query.query as string) || "";
    if (!query.trim()) {
      return res.status(400).json({ error: "Missing query parameter" });
    }

    const apiKey = process.env.USDA_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing USDA API key" });
    }

    const url = new URL("https://api.nal.usda.gov/fdc/v1/foods/search");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("query", query);
    url.searchParams.set("pageSize", "10");

    const response = await fetch(url.toString());

    if (!response.ok) {
      const text = await response.text();
      return res
        .status(response.status)
        .json({ error: "USDA API error", details: text });
    }

    const data = await response.json();

    const foods = (data.foods || []).map((food: any) => ({
      fdcId: food.fdcId,
      description: food.description,
      dataType: food.dataType,
      brandOwner: food.brandOwner ?? null,
      foodNutrients: food.foodNutrients ?? [],
    }));

    res.json({ foods });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Failed to search foods" });
  }
});

router.get("/users/:userId/foods", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const foods = await getFoodsByUserIdService(userId);
    res.json(foods);
  } catch (err) {
    console.error("Get user foods error:", err);
    res.status(500).json({ error: "Failed to get user foods" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const food = await getFoodByIdService(id);
    if (!food) return res.status(404).json({ error: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: "Failed to get food" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const food = await updateFoodService(id, req.body);
    if (!food) return res.status(404).json({ error: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: "Failed to update food" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deleteFoodService(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete food" });
  }
});

export default router;
