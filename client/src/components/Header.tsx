"use client";

import React from "react";

import Link from "next/link";

import { Route } from "@/models/routes";
import { useCurrentUser } from "@/modules/user/hooks/useCurrentUser";

import DefaultButton from "./DefaultButton";

const Header = () => {
  const { user } = useCurrentUser();

  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-base-100">
      <div className="mx-auto flex w-full max-w-[1000px] items-center justify-between p-4">
        <h1 className="text-3xl text-primary">Blog App</h1>
        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <Link href={Route.Blog}>
                <span className="link-hover link">Blog</span>
              </Link>
              <Link href={Route.Profile}>
                <DefaultButton>My Profile</DefaultButton>
              </Link>
            </>
          ) : (
            <>
              <Link href={Route.SignIn}>
                <span className="link-hover link">Sign In</span>
              </Link>
              <Link href={Route.SignUp}>
                <DefaultButton>Sign Up</DefaultButton>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
