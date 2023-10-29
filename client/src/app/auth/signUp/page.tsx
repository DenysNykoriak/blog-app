import { NextPage } from "next";
import React from "react";

import SignUpForm from "@/modules/auth/components/SignUpForm";

const SignUpPage: NextPage = () => {
  return (
    <div className="flex w-screen flex-1 flex-col items-center justify-center gap-8 px-2">
      <h1 className="text-3xl">Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
