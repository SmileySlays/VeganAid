import { pool } from "../db.ts";
import { User, CreateUserInput, UpdateUserInput } from "../models/user";

export async function createUser(input: CreateUserInput): Promise<User> {
  const q = `
    INSERT INTO users (email, password_hash, name)
    VALUES ($1, $2, $3)
    RETURNING id, email, password_hash, name
  `;
  const res = await pool.query(q, [
    input.email,
    input.password_hash,
    input.name,
  ]);
  return res.rows[0];
}

export async function getUserByAuth0Id(auth0Id: string): Promise<User | null> {
  const q = `SELECT id, auth0_id, email, name FROM users WHERE auth0_id = $1`;
  const res = await pool.query(q, [auth0Id]);
  return res.rows[0] ?? null;
}

export async function getAllUsers(): Promise<User[]> {
  const q = `SELECT id, email, password_hash, name FROM users ORDER BY id`;
  const res = await pool.query(q);
  return res.rows;
}

export async function updateUser(
  id: number,
  input: UpdateUserInput,
): Promise<User | null> {
  const fields: string[] = [];
  const values: any[] = [];

  if (input.email) {
    fields.push("email = $" + (fields.length + 1));
    values.push(input.email);
  }
  if (input.password_hash !== undefined) {
    fields.push("password_hash = $" + (fields.length + 1));
    values.push(input.password_hash);
  }
  if (input.name !== undefined) {
    fields.push("name = $" + (fields.length + 1));
    values.push(input.name);
  }

  if (fields.length === 0) return getUserById(id);

  values.push(id);
  const q = `UPDATE users SET ${fields.join(", ")} WHERE id = $${fields.length + 1} RETURNING id, email, password_hash, name`;
  const res = await pool.query(q, values);
  return res.rows[0] ?? null;
}

export async function deleteUser(id: number): Promise<boolean> {
  const q = `DELETE FROM users WHERE id = $1`;
  const res = await pool.query(q, [id]);
  return true;
}
