"use client";

import { NextPage } from "next";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import ErrorPage from "@/components/pages/ErrorPage";
import LoadingPage from "@/components/pages/LoadingPage";
import { Route } from "@/models/routes";
import UserProfile from "@/modules/user/components/UserProfile";
import { useCurrentUser } from "@/modules/user/hooks/useCurrentUser";
import { useUserByNickname } from "@/modules/user/hooks/useUserByNickname";

type Props = {
  params: {
    nickname: string;
  };
};

const Profile: NextPage<Props> = ({ params: { nickname } }) => {
  const router = useRouter();

  const { isLoading: isCurrentUserLoading, user: currentUser } =
    useCurrentUser();
  const { isLoading, data: user } = useUserByNickname(nickname);

  useEffect(() => {
    if (currentUser && user && currentUser.id === user.id) {
      router.push(Route.Profile);
    }
  }, [currentUser, router, user]);

  if (isLoading || isCurrentUserLoading) return <LoadingPage />;

  if (!user) return <ErrorPage text="User not found" />;

  return (
    <main className="mt-10 flex flex-col gap-8">
      <h1 className="text-center text-3xl">Profile</h1>
      <div className="mx-auto mb-4 w-full max-w-[800px] px-2">
        <UserProfile user={user} />
      </div>
    </main>
  );
};

export default Profile;
