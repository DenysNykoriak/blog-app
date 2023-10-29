import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

import { Route } from "@/models/routes";
import { useCurrentUser } from "@/modules/user/hooks/useCurrentUser";
import { signOutRequest } from "@/modules/user/services/userService";

import { AuthLocalStorageKey } from "..";

export const useSignOut = () => {
  const router = useRouter();

  const { mutate } = useCurrentUser();

  const { isMutating, trigger } = useSWRMutation(
    "/auth/signOut",
    () => {
      const refreshToken = localStorage.getItem(
        AuthLocalStorageKey.RefreshToken,
      );

      if (!refreshToken) return null;

      return signOutRequest(refreshToken);
    },
    {
      throwOnError: false,
      onSuccess: () => {
        localStorage.removeItem(AuthLocalStorageKey.AccessToken);
        localStorage.removeItem(AuthLocalStorageKey.RefreshToken);
        mutate(undefined, { revalidate: true });
        router.push(Route.SignIn);
      },
      onError: () => {
        localStorage.removeItem(AuthLocalStorageKey.AccessToken);
        localStorage.removeItem(AuthLocalStorageKey.RefreshToken);
        mutate(undefined, { revalidate: true });
        router.push(Route.SignIn);
      },
    },
  );

  return { signOut: trigger, isMutating };
};
