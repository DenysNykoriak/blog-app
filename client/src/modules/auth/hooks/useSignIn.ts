import useSWRMutation from "swr/mutation";

import { handleFetchError } from "@/utils/handleFetchError";

import { AuthLocalStorageKey } from "..";
import {
  AuthResponse,
  SignInPayload,
  signInRequest,
} from "../services/authService";

export const useSignIn = (
  handleSuccess?: (response: AuthResponse) => void,
  handleError?: (errors: string[]) => void,
) =>
  useSWRMutation(
    "/signIn",
    (_, { arg }: { arg: SignInPayload }) => signInRequest(arg),
    {
      throwOnError: false,
      onSuccess: (response) => {
        localStorage.setItem(
          AuthLocalStorageKey.AccessToken,
          response.accessToken,
        );
        localStorage.setItem(
          AuthLocalStorageKey.RefreshToken,
          response.refreshToken,
        );

        handleSuccess?.(response);
      },
      onError: handleFetchError(handleError),
    },
  );
