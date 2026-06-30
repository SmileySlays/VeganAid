"repository pattern isolates DB logic so the engine can be swapped without touching routes";
import { pool } from "../db.ts";

export async function addUserFood(input: {
  user_id: number;
  food_fdc_id?: number | null;
  food_description: string;
  quantity: number;
  nutrients: any[];
}) {
  const q = `
    INSERT INTO user_foods
      (user_id, food_fdc_id, food_description, quantity, nutrients)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, user_id, food_fdc_id, food_description, quantity, nutrients, created_at
  `;
  const res = await pool.query(q, [
    input.user_id,
    input.food_fdc_id ?? null,
    input.food_description,
    input.quantity,
    JSON.stringify(input.nutrients ?? []),
  ]);
  return res.rows[0];
}

export async function getFoodById(id: number) {
  const q = `
    SELECT id, user_id, food_fdc_id, food_description, quantity, nutrients, created_at
    FROM user_foods
    WHERE id = $1
  `;
  const res = await pool.query(q, [id]);
  return res.rows[0] ?? null;
}

export async function getFoodsByUserId(userId: number) {
  const q = `
    SELECT id, user_id, food_fdc_id, food_description, quantity, nutrients, created_at
    FROM user_foods
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const res = await pool.query(q, [userId]);
  return res.rows;
}

export async function updateFood(
  id: number,
  input: { quantity?: number; nutrients?: any[] },
) {
  const fields: string[] = [];
  const values: any[] = [];

  if (input.quantity !== undefined) {
    fields.push("quantity = $" + (fields.length + 1));
    values.push(input.quantity);
  }
  if (input.nutrients !== undefined) {
    fields.push("nutrients = $" + (fields.length + 1));
    values.push(JSON.stringify(input.nutrients));
  }

  if (fields.length === 0) return getFoodById(id);

  values.push(id);
  const q = `
    UPDATE user_foods
    SET ${fields.join(", ")}
    WHERE id = $${fields.length + 1}
    RETURNING id, user_id, food_fdc_id, food_description, quantity, nutrients, created_at
  `;
  const res = await pool.query(q, values);
  return res.rows[0] ?? null;
}

export async function deleteFood(id: number): Promise<boolean> {
  await pool.query(`DELETE FROM user_foods WHERE id = $1`, [id]);
  return true;
}
