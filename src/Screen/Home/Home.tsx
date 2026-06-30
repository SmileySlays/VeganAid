import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    alt: "Colorful vegan grain bowl",
    credit: "Anna Pelzer / Unsplash",
  },
  {
    src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80",
    alt: "Fresh plant-based meal spread",
    credit: "Brooke Lark / Unsplash",
  },
  {
    src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    alt: "Vibrant vegan salad bowl",
    credit: "Odiseo Castrejon / Unsplash",
  },
];

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
      <main className="min-h-screen bg-emerald-50 pt-4">
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-emerald-700 mb-6 leading-tight">
            Your Vegan Journey Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            Track nutrition, discover recipes, log meals, and thrive on your
            plant-based lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            {/* <Link
              to="/recipes"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 rounded-lg text-xl font-semibold transition-colors"
            >
              Explore Recipes
            </Link> */}
            <Link
              to="/nutrition"
              className="w-full sm:w-auto bg-white border-2 border-emerald-200 hover:border-emerald-400 text-emerald-800 px-12 py-6 rounded-lg text-xl font-semibold transition-colors"
            >
              Nutrition Tracker
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {PHOTOS.map((photo) => (
              <div
                key={photo.alt}
                className="overflow-hidden rounded-lg border border-gray-200 shadow-sm"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-72 object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
