import useSWRMutation from "swr/mutation";

import { handleFetchError } from "@/utils/handleFetchError";

import { Comment } from "..";
import {
  CreateCommentPayload,
  createCommentRequest,
} from "../services/blogService";

import { usePostsFeed } from "./usePostsFeed";

export const useCreateComment = (
  handleSuccess?: (response: Comment) => void,
  handleError?: (errors: string[]) => void,
) => {
  const { updateAll } = usePostsFeed(10);

  const { isMutating, trigger } = useSWRMutation(
    "/posts/createComment",
    (_, { arg }: { arg: CreateCommentPayload }) => createCommentRequest(arg),
    {
      throwOnError: false,
      onSuccess: (newComment) => {
        updateAll();

        handleSuccess?.(newComment);
      },
      onError: handleFetchError(handleError),
    },
  );

  return { isMutating, createComment: trigger };
};
