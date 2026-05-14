import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useNavigation} from '@react-navigation/native';


const SignupButton = () => {

  return (
    <button type="button" onClick={() => history.pushState("Signup", "/signin") } className="text-white bg-[#820874] box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-serif leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">
      Sign Up
    </button>
  );
};

export default SignupButton;