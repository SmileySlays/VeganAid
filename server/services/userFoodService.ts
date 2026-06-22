import {
  addUserFood,
  getFoodById,
  getFoodsByUserId,
  updateFood,
  deleteFood,
} from "../repositories/userFoodRepository.ts";
import { UserFood, CreateUserFoodInput } from "../models/userFood.ts";

export async function addFoodToUserService(
  userId: number,
  input: CreateUserFoodInput,
): Promise<UserFood> {
  if (input.user_id !== userId) {
    throw new Error("User ID mismatch");
  }
  return addUserFood(input);
}

export async function getFoodByIdService(id: number): Promise<UserFood | null> {
  return getFoodById(id);
}

export async function getFoodsByUserIdService(
  userId: number,
): Promise<UserFood[]> {
  return getFoodsByUserId(userId);
}

export async function updateFoodService(
  id: number,
  input: {
    food_fdc_id?: number;
    food_description?: string;
    calories?: number;
    nutrients?: any[];
  },
): Promise<UserFood | null> {
  return updateFood(id, input);
}

export async function deleteFoodService(id: number): Promise<boolean> {
  return deleteFood(id);
}
