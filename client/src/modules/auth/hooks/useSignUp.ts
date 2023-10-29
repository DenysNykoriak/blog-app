import useSWRMutation from "swr/mutation";

import { useCurrentUser } from "@/modules/user/hooks/useCurrentUser";
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
) => {
  const { mutate } = useCurrentUser();

  return useSWRMutation(
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

        mutate(undefined, { revalidate: true });

        handleSuccess?.(response);
      },
      onError: handleFetchError(handleError),
    },
  );
};
