import axios from "axios";

import { AuthLocalStorageKey } from "@/modules/auth";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use((req) => {
  if (typeof window === "undefined") return req;

  const accessToken = localStorage.getItem(AuthLocalStorageKey.AccessToken);

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

axiosClient.interceptors.response.use((res) => {
  if (typeof window === "undefined") return res;

  // TODO: update response interceptor
  console.log(res.status);

  return res;
});
