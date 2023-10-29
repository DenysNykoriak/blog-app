import { axiosClient } from "@/axiosClient";

export type SignUpPayload = {
  fname: string;
  lname: string;
  email: string;
  nickname: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export const signUpRequest = async (payload: SignUpPayload) => {
  const response = await axiosClient.post<AuthResponse>(
    "/auth/signUp",
    payload,
  );

  return response.data;
};
