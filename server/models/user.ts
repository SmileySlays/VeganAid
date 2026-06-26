export type User = {
  id: number;
  auth0_id: string;
  email: string;
  name?: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateUserInput = {
  auth0_id: string;
  email: string;
  name?: string | null;
};

export type UpdateUserInput = {
  auth0_id: string;
  email?: string;
  name?: string | null;
};
