import { Router } from "express";
import { pool } from "../db.ts";
import {
  addFoodToUserService,
  getFoodByIdService,
  getFoodsByUserIdService,
  updateFoodService,
  deleteFoodService,
} from "../services/userFoodService.ts";

const router = Router();

// POST /users/:userId/foods
router.post("/users/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const food = await addFoodToUserService(userId, req.body);
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ error: "Failed to add food to user" });
  }
});

// GET /foods/search_food
router.get("/search_food", async (req, res) => {
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

// GET /foods/:id
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

// GET /users/:userId/foods
router.get("/users/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const foods = await getFoodsByUserIdService(userId);
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: "Failed to get user foods" });
  }
});

// PUT /foods/:id
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

// DELETE /foods/:id
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
