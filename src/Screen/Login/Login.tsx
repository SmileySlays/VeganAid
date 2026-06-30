import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../../Screen/Profile/Profile";
import LoginButton from "../../Components/LoginButton/LoginButton";
import LogoutButton from "../../Components/LogoutButton/LogoutButton";
import SignupButton from "../../Components/SigninButton/SigninButton";

function Login() {
  const { isAuthenticated, isLoading, error, user, getAccessTokenSilently } =
    useAuth0();
  console.log("auth state", { isAuthenticated, isLoading, user });

  // const [synced, setSynced] = useState(false);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     setSynced(false);
  //     return;
  //   }

  //   if (isLoading || !user?.sub || synced) return;

  //   const syncUser = async () => {
  //     try {
  //       const token = await getAccessTokenSilently({
  //         authorizationParams: {
  //           audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  //         },
  //       });

  //       console.log("syncing user now");

  //       const response = await fetch("/api/users/sync-auth0-user", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           auth0_id: user.sub,
  //           email: user.email,
  //           name: user.name,
  //         }),
  //       });

  //       console.log("sync response", response.status);

  //       if (!response.ok) throw new Error("sync failed");

  //       setSynced(true);
  //     } catch (err) {
  //       console.error("sync error:", err);
  //     }
  //   };

  //   syncUser();
  // }, [
  //   isLoading,
  //   isAuthenticated,
  //   user?.sub,
  //   user?.email,
  //   user?.name,
  //   synced,
  //   getAccessTokenSilently,
  // ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-4">
        <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-200">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm border border-red-200">
          <h1 className="text-2xl font-semibold text-red-600">Oops!</h1>
          <p className="mt-2 text-gray-700">Something went wrong.</p>
          <p className="mt-2 text-sm text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-4">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
        <div className="flex flex-col items-center gap-6 text-center">

          <img
            src="/src/Media/Photos/vegetables-salad-svgrepo-com.svg"
            alt="VeganAid logo - Basket of vegetables"
            className="h-20 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div>
            <h1 className="text-4xl font-bold text-emerald-700 tracking-tight">
              Welcome to VeganAid
            </h1>
            <p className="mt-4 text-gray-600 max-w-sm mx-auto">
              Sign in to access your saved meals, recipes, and journals.
            </p>
          </div>

          {isAuthenticated ? (
            <div className="w-full rounded-lg bg-emerald-50 p-6 text-left border border-emerald-100">
              <div className="text-emerald-700 font-semibold">
                Successfully authenticated!
              </div>
              <div className="mt-4">
                <Profile />
              </div>
              <div className="mt-6">
                <LogoutButton />
              </div>
            </div>
          ) : (
            <div className="w-full rounded-lg bg-gray-50 p-6 border border-gray-200">
              <p className="text-center text-gray-700">
                Get started by signing in to your account
              </p>
              <div className="mt-6">
                <LoginButton />
              </div>
              <div className="mt-3">
                <SignupButton />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Login;
