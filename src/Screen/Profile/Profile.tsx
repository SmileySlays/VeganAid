import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../Components/LogoutButton/LogoutButton";
import Navbar from "../../Components/Navbar/Navbar.js";

const Profile = () => {
  const { user, isLoading, error, getAccessTokenSilently } = useAuth0();

  console.log("Profile state:", { isLoading, error, hasUser: !!user });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-8 py-6 text-center text-gray-700">
          Loading profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-6">
        <div className="w-full max-w-xl bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <h3 className="text-xl font-bold text-red-600 mb-4">Auth0 Error</h3>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <button
            onClick={() => getAccessTokenSilently().catch(console.error)}
            className="bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-lg text-white font-semibold transition-colors"
          >
            Retry token
          </button>
        </div>
      </div>
    );
  }

  return user ? (
    <>
      <Navbar />
      <div className="min-h-screen bg-emerald-50 py-12 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-emerald-700 mb-2">
              Profile
            </h1>
            <p className="text-gray-600">
              View your account details and manage your session.
            </p>
          </div>

          <div className="max-w-2xl bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <div className="flex flex-col items-center gap-6">
              <img
                src={
                  user.picture ||
                  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='110' viewBox='0 0 110 110'%3E%3Ccircle cx='55' cy='55' r='55' fill='%2363b3ed'/%3E%3Cpath d='M55 50c8.28 0 15-6.72 15-15s-6.72-15-15-15-15 6.72-15 15 6.72 15 15 15zm0 7.5c-10 0-30 5.02-30 15v3.75c0 2.07 1.68 3.75 3.75 3.75h52.5c2.07 0 3.75-1.68 3.75-3.75V72.5c0-9.98-20-15-30-15z' fill='%23fff'/%3E%3C/svg%3E`
                }
                alt={user.name || "User"}
                className="h-24 w-24 rounded-full object-cover border-2 border-emerald-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='110' viewBox='0 0 110 110'%3E%3Ccircle cx='55' cy='55' r='55' fill='%2363b3ed'/%3E%3Cpath d='M55 50c8.28 0 15-6.72 15-15s-6.72-15-15-15-15 6.72-15 15 6.72 15 15 15zm0 7.5c-10 0-30 5.02-30 15v3.75c0 2.07 1.68 3.75 3.75 3.75h52.5c2.07 0 3.75-1.68 3.75-3.75V72.5c0-9.98-20-15-30-15z' fill='%23fff'/%3E%3C/svg%3E`;
                }}
              />

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {user.name}
                </div>
                <div className="text-gray-600">{user.email}</div>
              </div>

              <div className="w-full rounded-lg bg-emerald-50 border border-emerald-100 p-5 text-left">
                <div className="text-sm font-semibold text-emerald-700 mb-2">
                  Account Info
                </div>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {user.name || "Not available"}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {user.email || "Not available"}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Profile;
