import useSWRMutation from "swr/mutation";

import { handleFetchError } from "@/utils/handleFetchError";

import { AuthLocalStorageKey } from "..";
import {
  AuthResponse,
  SignUpPayload,
  signUpRequest,
} from "../services/authService";

export const useSignUp = (
  handleSuccess?: (response: AuthResponse) => void,
  handleError?: (errors: string[]) => void,
) =>
  useSWRMutation(
    "/signUp",
    (_, { arg }: { arg: SignUpPayload }) => signUpRequest(arg),
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
