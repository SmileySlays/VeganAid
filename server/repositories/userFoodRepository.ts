import { pool } from "../db.ts";
import { UserFood, CreateUserFoodInput } from "../models/userFood.ts";

export async function addUserFood(
  input: CreateUserFoodInput,
): Promise<UserFood> {
  const q = `
    INSERT INTO user_foods
      (user_id, food_fdc_id, food_description, calories, nutrients)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, user_id, food_fdc_id, food_description, calories, nutrients, created_at
  `;
  const res = await pool.query(q, [
    input.user_id,
    input.food_fdc_id,
    input.food_description,
    input.calories,
    input.nutrients,
  ]);
  return res.rows[0];
}

export async function getFoodById(id: number): Promise<UserFood | null> {
  const q = `
    SELECT id, user_id, food_fdc_id, food_description, calories, nutrients, created_at
    FROM user_foods
    WHERE id = $1
  `;
  const res = await pool.query(q, [id]);
  return res.rows[0] ?? null;
}

export async function getFoodsByUserId(userId: number): Promise<UserFood[]> {
  const q = `
    SELECT id, user_id, food_fdc_id, food_description, calories, nutrients, created_at
    FROM user_foods
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const res = await pool.query(q, [userId]);
  return res.rows;
}

export async function updateFood(
  id: number,
  input: {
    food_fdc_id?: number;
    food_description?: string;
    calories?: number;
    nutrients?: any[];
  },
): Promise<UserFood | null> {
  const fields: string[] = [];
  const values: any[] = [];

  if (input.food_fdc_id !== undefined) {
    fields.push("food_fdc_id = $" + (fields.length + 1));
    values.push(input.food_fdc_id);
  }
  if (input.food_description !== undefined) {
    fields.push("food_description = $" + (fields.length + 1));
    values.push(input.food_description);
  }
  if (input.calories !== undefined) {
    fields.push("calories = $" + (fields.length + 1));
    values.push(input.calories);
  }
  if (input.nutrients !== undefined) {
    fields.push("nutrients = $" + (fields.length + 1));
    values.push(input.nutrients);
  }

  if (fields.length === 0) return getFoodById(id);

  values.push(id);
  const q = `
    UPDATE user_foods
    SET ${fields.join(", ")}
    WHERE id = $${fields.length + 1}
    RETURNING id, user_id, food_fdc_id, food_description, calories, nutrients, created_at
  `;
  const res = await pool.query(q, values);
  return res.rows[0] ?? null;
}

export async function deleteFood(id: number): Promise<boolean> {
  const q = `DELETE FROM user_foods WHERE id = $1`;
  await pool.query(q, [id]);
  return true;
}
