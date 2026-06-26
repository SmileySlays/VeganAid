import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  if (!isAuthenticated) return null;

  return (
    <button
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        })
      }
      className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition"
    >
      Log Out
    </button>
  );
}

export default LogoutButton;
