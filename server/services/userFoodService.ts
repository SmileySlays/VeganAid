import {
  addUserFood,
  getFoodById,
  getFoodsByUserId,
  updateFood,
  deleteFood,
} from "../repositories/userFoodRepository.ts";

export async function getFoodByIdService(id: number) {
  return getFoodById(id);
}

export async function getFoodsByUserIdService(userId: number) {
  return getFoodsByUserId(userId);
}

export async function updateFoodService(
  id: number,
  input: { quantity?: number; nutrients?: any[] },
) {
  return updateFood(id, input);
}

export async function deleteFoodService(id: number): Promise<boolean> {
  return deleteFood(id);
}
