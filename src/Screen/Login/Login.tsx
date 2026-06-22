import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../../Screen/Profile/Profile";
import LoginButton from "../../Components/LoginButton/LoginButton";
import LogoutButton from "../../Components/LogoutButton/LogoutButton";
import SignupButton from "../../Components/SigninButton/SigninButton";

function Login() {
  const { isAuthenticated, isLoading, error, user, getAccessTokenSilently } =
    useAuth0();

  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      console.log("sync effect fired", { isAuthenticated, user, synced });

      if (!isAuthenticated || !user || synced) {
        console.log("sync skipped");
        return;
      }

      try {
        const token = await getAccessTokenSilently();

        const response = await fetch("/api/users/sync-auth0-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            auth0_id: user.sub,
            email: user.email,
            name: user.name,
          }),
        });

        if (!response.ok) {
          throw new Error(`Sync failed: ${response.status}`);
        }

        setSynced(true);
      } catch (err) {
        console.error("Failed to sync user:", err);
      }
    };

    syncUser();
  }, [isAuthenticated, user, synced, getAccessTokenSilently]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-red-200">
          <h1 className="text-2xl font-semibold text-red-600">Oops!</h1>
          <p className="mt-2 text-slate-700">Something went wrong.</p>
          <p className="mt-2 text-sm text-slate-500">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#64003e]">
      <div className="w-full max-w-lg rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur-2xl md:p-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <img
            src="/src/Media/Photos/vegetables-salad-svgrepo-com.svg"
            alt="VeganAid logo - Basket of vegtables"
            className="h-20 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div>
            <h1 className="text-4xl font-serif tracking-tight text-slate-900">
              Welcome to VeganAid
            </h1>
            <p className="mt-4 text-slate-600">
              Sign in to access your saved meals, recipes, and journals.
            </p>
          </div>

          {isAuthenticated ? (
            <div className="w-full rounded-2xl bg-emerald-50 p-6 text-left ring-1 ring-emerald-100">
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
            <div className="w-full rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <p className="text-center text-slate-700">
                Get started by signing in to your account
              </p>
              <div className="mt-6 ">
                <LoginButton />
              </div>
              <div>
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
