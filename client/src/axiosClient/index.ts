import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { Route } from "@/models/routes";
import { AuthLocalStorageKey } from "@/modules/auth";
import { checkIsPathnameProtectedRoute } from "@/utils/checkIsPathnameProtectedRoute";

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

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (typeof window === "undefined") return err;

    const refreshToken = localStorage.getItem(AuthLocalStorageKey.RefreshToken);

    if (!refreshToken) {
      if (checkIsPathnameProtectedRoute(window.location.pathname)) {
        window.location.href = Route.SignIn;
      }

      return err;
    }

    const originalConfig = err.config;

    if (err.response.status === 401 && !originalConfig._retry) {
      try {
        const response = await axiosClient.post<{ accessToken: string }>(
          "/auth/refreshToken",
          undefined,
          {
            headers: {
              "refresh-token": refreshToken,
            },
            _retry: true,
          } as AxiosRequestConfig,
        );

        const newAccessToken = response.data.accessToken;

        localStorage.setItem(AuthLocalStorageKey.AccessToken, newAccessToken);

        return axiosClient(originalConfig);
      } catch (refreshErr) {
        if (refreshErr instanceof AxiosError && refreshErr.status === 401) {
          localStorage.removeItem(AuthLocalStorageKey.AccessToken);
          localStorage.removeItem(AuthLocalStorageKey.RefreshToken);

          if (checkIsPathnameProtectedRoute(window.location.pathname)) {
            window.location.href = Route.SignIn;
          }
        }
      }
    }

    return err;
  },
);
