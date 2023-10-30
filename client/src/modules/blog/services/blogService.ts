import { axiosClient } from "@/axiosClient";

import { Post } from "..";

type PostsFeedResponse = {
  posts: Post[];
};

export const getPostsFeedRequest = async (limit: number, skip: number) => {
  const response = await axiosClient.get<PostsFeedResponse>("/posts/feed", {
    params: { limit, skip },
  });

  return response.data;
};
