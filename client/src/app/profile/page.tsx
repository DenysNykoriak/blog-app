"use client";

import { NextPage } from "next";
import React from "react";

import UserProfile from "@/modules/user/components/UserProfile";
import { useCurrentUser } from "@/modules/user/hooks/useCurrentUser";

const Profile: NextPage = () => {
  const { user } = useCurrentUser();

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
