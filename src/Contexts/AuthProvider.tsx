import { ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "./AuthContext.js";

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    isAuthenticated,
    isLoading,
    user,
    error,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  const login = () => loginWithRedirect();

  const logout = () =>
    auth0Logout({
      logoutParams: { returnTo: window.location.origin },
    });

  const getAccessToken = async (audience?: string, scope?: string) => {
    try {
      return await getAccessTokenSilently({
        authorizationParams: { audience, scope },
      });
    } catch (error) {
      console.error("Failed to get access token:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        error,
        login,
        logout,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
