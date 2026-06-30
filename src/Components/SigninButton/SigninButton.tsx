import { useAuth0 } from "@auth0/auth0-react";

export default function SignupButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            screen_hint: "signup",
          },
        })
      }
      className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-3 px-6 rounded-lg font-semibold transition-colors"
    >
      Sign up
    </button>
  );
}
