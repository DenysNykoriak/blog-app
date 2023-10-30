"use client";

import { NextPage } from "next";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import LoadingPage from "@/components/pages/LoadingPage";
import { Route } from "@/models/routes";
import UserProfile from "@/modules/user/components/UserProfile";
import { useCurrentUser } from "@/modules/user/hooks/useCurrentUser";

const Profile: NextPage = () => {
  const router = useRouter();

  const { isLoading, user } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(Route.SignIn);
    }
  }, [isLoading, router, user]);

  if (isLoading) return <LoadingPage />;

  if (!user) return null;

  return (
    <main className="mt-10 flex flex-col gap-8">
      <h1 className="text-center text-3xl">Your Profile</h1>
      <div className="mx-auto mb-4 w-full max-w-[800px] px-2">
        <UserProfile user={user} isCurrentUserProfile />
      </div>
    </main>
  );
};

export default Profile;
