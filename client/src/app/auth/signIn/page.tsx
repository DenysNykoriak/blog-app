import { NextPage } from "next";
import React from "react";

import SignInForm from "@/modules/auth/components/SignInForm";

const SignIn: NextPage = () => {
  return (
    <div className="flex w-screen flex-1 flex-col items-center justify-center gap-8 px-2">
      <h1 className="text-3xl">Sign In</h1>
      <SignInForm />
    </div>
  );
};

export default SignIn;
