import useSWRMutation from "swr/mutation";

import { handleFetchError } from "@/utils/handleFetchError";

import { Post } from "..";
import { CreatePostPayload, createPostRequest } from "../services/blogService";

import { usePostsFeed } from "./usePostsFeed";

export const useCreatePost = (
  handleSuccess?: (response: Post) => void,
  handleError?: (errors: string[]) => void,
) => {
  const { updateAll } = usePostsFeed(10);

  const { isMutating, trigger } = useSWRMutation(
    "/posts/create",
    (_, { arg }: { arg: CreatePostPayload }) => createPostRequest(arg),
    {
      throwOnError: false,
      onSuccess: (newPost) => {
        updateAll();

        handleSuccess?.(newPost);
      },
      onError: handleFetchError(handleError),
    },
  );

  return { isMutating, createPost: trigger };
};
