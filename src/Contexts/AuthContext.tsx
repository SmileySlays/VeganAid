import { createContext, useContext } from "react";
import type { User } from "@auth0/auth0-react";

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | undefined;
  error: Error | undefined;
  login: () => void;
  logout: () => void;
  getAccessToken: (audience?: string, scope?: string) => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
