import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { redirect, Route } from "react-router";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button type="button" onClick={() => loginWithRedirect()} className="text-white bg-[#820874] box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-serif leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">
      Log In
    </button>
  );
};

export default LoginButton;
