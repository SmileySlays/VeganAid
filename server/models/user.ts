export type User = {
  id: number;
  auth0_id: string;
  email: string;
  name?: string;
};

export type CreateUserInput = {
  auth0_id: string;
  email: string;
  name?: string;
};

export type UpdateUserInput = {
  auth0_id: string;
  email?: string;
  name?: string;
};
