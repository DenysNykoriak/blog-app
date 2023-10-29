import useSWRMutation from "swr/mutation";

import { handleFetchError } from "@/utils/handleFetchError";

import { User } from "..";
import {
  EditCurrentUserPayload,
  editCurrentUserRequest,
} from "../services/userService";

import { useCurrentUser } from "./useCurrentUser";

export const useCurrentUserEdit = (
  handleSuccess?: (response: User) => void,
  handleError?: (errors: string[]) => void,
) => {
  const { mutate } = useCurrentUser();

  const { isMutating, trigger } = useSWRMutation(
    "/users/edit",
    (_, { arg }: { arg: EditCurrentUserPayload }) =>
      editCurrentUserRequest(arg),
    {
      throwOnError: false,
      onSuccess: (data) => {
        mutate(data);

        handleSuccess?.(data);
      },
      onError: handleFetchError(handleError),
    },
  );

  return { isMutating, edit: trigger };
};
