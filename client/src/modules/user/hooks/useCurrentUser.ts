import useSWR from "swr";

import { getCurrentUserRequest } from "../services/userService";

export const useCurrentUser = () =>
  useSWR("/users/current", getCurrentUserRequest);
