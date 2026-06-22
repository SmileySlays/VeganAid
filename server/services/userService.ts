import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../repositories/userRepository.ts";
import { User, CreateUserInput, UpdateUserInput } from "../models/user.ts";

export async function createUserService(input: CreateUserInput): Promise<User> {
  return createUser(input);
}

export async function getUserByIdService(id: number): Promise<User | null> {
  return getUserById(id);
}

export async function getAllUsersService(): Promise<User[]> {
  return getAllUsers();
}

export async function updateUserService(
  id: number,
  input: UpdateUserInput,
): Promise<User | null> {
  return updateUser(id, input);
}

export async function deleteUserService(id: number): Promise<boolean> {
  return deleteUser(id);
}
