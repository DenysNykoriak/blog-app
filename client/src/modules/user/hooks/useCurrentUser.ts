import useSWR from "swr";

import { getCurrentUserRequest } from "../services/userService";

export const useCurrentUser = () => {
  const {
    isLoading,
    data: user,
    mutate,
  } = useSWR("/users/current", getCurrentUserRequest);

  return { isLoading, user, mutate };
};
