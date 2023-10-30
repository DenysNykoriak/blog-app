import { User } from "../user";

export interface Comment<TNested extends boolean = false> {
  id: string;
  author: User;
  postId: string;
  content: string;
  rootCommentId: TNested extends true ? string : null;
  createdAt: string;
  updatedAt: string;
  nestedComments: TNested extends true ? never : Comment<true>[];
}

export interface Post {
  id: string;
  content: string;
  author: User;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}
