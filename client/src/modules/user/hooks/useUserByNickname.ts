import useSWR from "swr";

import { getUserByNicknameRequest } from "../services/userService";

export const useUserByNickname = (userNickname: string) =>
  useSWR(`/users/all/${userNickname}`, () =>
    getUserByNicknameRequest(userNickname),
  );
