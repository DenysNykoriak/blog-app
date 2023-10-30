import { axiosClient } from "@/axiosClient";

import { Comment, Post } from "..";

type PostsFeedResponse = {
  posts: Post[];
};

export const getPostsFeedRequest = async (limit: number, skip: number) => {
  const response = await axiosClient.get<PostsFeedResponse>("/posts/feed", {
    params: { limit, skip },
  });

  return response.data;
};

export type CreatePostPayload = {
  content: string;
};

type CreatePostResponse = Post;

export const createPostRequest = async (payload: CreatePostPayload) => {
  const response = await axiosClient.post<CreatePostResponse>(
    "/posts/create",
    payload,
  );

  return response.data;
};

export type CreateCommentPayload = {
  content: string;
  postId: string;
  rootCommentId?: string;
};

type CreateCommentResponse = Comment;

export const createCommentRequest = async (payload: CreateCommentPayload) => {
  const response = await axiosClient.post<CreateCommentResponse>(
    "/posts/createComment",
    payload,
  );

  return response.data;
};
