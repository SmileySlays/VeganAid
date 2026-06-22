export type User = {
  id: number;
  email: string;
  password_hash: string;
  name?: string;
};

export type CreateUserInput = {
  email: string;
  password_hash: string;
  name?: string;
};

export type UpdateUserInput = {
  email?: string;
  password_hash?: string;
  name?: string;
};
