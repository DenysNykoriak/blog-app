import { axiosClient } from "@/axiosClient";

import { User } from "..";

type UserResponse = User;

export const getCurrentUserRequest = async () => {
  const response = await axiosClient.get<UserResponse>("/users/current");

  return response.data;
};

export const getUserByNicknameRequest = async (nickname: string) => {
  const response = await axiosClient.get<UserResponse>(
    `/users/all/${nickname}`,
  );

  return response.data;
};

export type EditCurrentUserPayload = {
  nickname?: string;
  fname?: string;
  lname?: string;
  email?: string;
  bio?: string;
  password?: string;
};

export const editCurrentUserRequest = async (
  payload: EditCurrentUserPayload,
) => {
  const response = await axiosClient.patch<UserResponse>(
    "/users/edit",
    payload,
  );

  return response.data;
};

export const signOutRequest = async (refreshToken: string) => {
  await axiosClient.get("/auth/signOut", {
    headers: { "refresh-token": refreshToken },
  });

  return null;
};
