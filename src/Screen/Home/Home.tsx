import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";

type AuthError = {
  error?: string;
  message?: string;
};

function Home() {
  const {
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();

  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user?.sub || synced) return;

    const syncUser = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });

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
          const text = await response.text();
          throw new Error(`sync failed: ${response.status} ${text}`);
        }

        setSynced(true);
      } catch (err: unknown) {
        const authErr = err as AuthError;

        if (
          authErr?.error === "consent_required" ||
          authErr?.error === "login_required" ||
          authErr?.error === "interaction_required"
        ) {
          await loginWithRedirect({
            authorizationParams: {
              screen_hint: "login",
            },
            appState: {
              returnTo: window.location.pathname,
            },
          });
          return;
        }

        console.error("sync error:", err);
      }
    };

    syncUser();
  }, [
    isLoading,
    isAuthenticated,
    user?.sub,
    user?.email,
    user?.name,
    synced,
    getAccessTokenSilently,
    loginWithRedirect,
  ]);

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pt-4">
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-6 leading-tight">
            Your Vegan Journey Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            Track nutrition, discover recipes, log meals, and thrive on your
            plant-based lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <Link
              to="/recipes"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              🍲 Explore Recipes
            </Link>
            <Link
              to="/nutrition"
              className="w-full sm:w-auto bg-white/80 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-300 text-emerald-800 px-12 py-6 rounded-2xl text-xl font-semibold shadow-xl hover:shadow-emerald-100 transition-all duration-300 hover:scale-105"
            >
              📊 Nutrition Tracker
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/70 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-white/50">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Nutrition Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor calories, macros, and micronutrients with precision.
              </p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-white/50">
              <div className="w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🍲</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Recipe Discovery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Curated plant-based recipes for every meal and occasion.
              </p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-white/50">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Meal Journal
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Log your daily intake and celebrate your progress.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
