import dayjs from "dayjs";
import React, { useMemo, useState } from "react";

import Link from "next/link";

import UserAvatar from "@/components/UserAvatar";
import { Route } from "@/models/routes";

import { Comment, Post } from "..";

import AddReplyBubble from "./AddReplyBubble";
import CreateCommentForm from "./CreateCommentForm";

const sortComments = (
  aComment: Comment | Comment<true>,
  bComment: Comment | Comment<true>,
) => {
  const aDate = dayjs(aComment.createdAt);
  const bDate = dayjs(bComment.createdAt);

  if (aDate.isBefore(bDate)) return 1;
  else if (aDate.isSame(bDate)) return 0;

  return -1;
};

type Props = {
  post: Post;
};

const FeedPost = ({ post }: Props) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false);

  const toggleIsCommentsShown = () => {
    setIsCommentsShown((prev) => !prev);
  };

  const sortedComments = useMemo(() => {
    return [...(post.comments ?? [])].sort(sortComments).map((comment) => ({
      ...comment,
      nestedComments: comment.nestedComments.sort(sortComments),
    }));
  }, [post.comments]);

  return (
    <div>
      <div className="flex items-center justify-between rounded-t-xl bg-primary bg-opacity-[.2] px-4 py-2">
        <div className="flex items-center gap-4">
          <UserAvatar user={post.author} size="small" />
          <Link href={`${Route.Profile}/${post.author.nickname}`}>
            <div>
              <h1 className="text-xl">
                {post.author.fname} {post.author.lname}
              </h1>
              <span className="text-xs text-base-content">
                @{post.author.nickname}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-b-xl bg-white bg-opacity-[.05] px-4 py-2">
        <p>{post.content}</p>
        <div className="divider" />
        <CreateCommentForm postId={post.id} />
      </div>

      {isCommentsShown && (
        <div className="mt-4 flex flex-col gap-2">
          {sortedComments.map((comment) => (
            <div key={comment.id}>
              <div className="chat chat-start">
                <div className="avatar chat-image">
                  <UserAvatar user={comment.author} size="small" isRingHidden />
                </div>
                <div className="chat-header">
                  <Link
                    href={`${Route.Profile}/${comment.author.nickname}`}
                  >{`${comment.author.fname} ${comment.author.lname}`}</Link>

                  <time className="ml-1 text-xs opacity-50">
                    {dayjs(comment.createdAt).format("HH:mm MMMM D, YYYY")}
                  </time>
                </div>
                <div className="chat-bubble">{comment.content}</div>
              </div>
              <div className="chat chat-start ml-20">
                <AddReplyBubble postId={post.id} rootCommentId={comment.id} />
              </div>
              {comment.nestedComments.map((nestedComment) => (
                <div key={nestedComment.id} className="chat chat-start ml-20">
                  <div className="avatar chat-image">
                    <UserAvatar
                      user={nestedComment.author}
                      size="small"
                      isRingHidden
                    />
                  </div>
                  <div className="chat-header">
                    <Link
                      href={`${Route.Profile}/${nestedComment.author.nickname}`}
                    >{`${nestedComment.author.fname} ${nestedComment.author.lname}`}</Link>

                    <time className="ml-1 text-xs opacity-50">
                      {dayjs(nestedComment.createdAt).format(
                        "HH:mm MMMM D, YYYY",
                      )}
                    </time>
                  </div>
                  <div className="chat-bubble">{nestedComment.content}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {!!post?.comments?.length && (
        <div className="divider">
          <button
            className="link-hover link opacity-50"
            onClick={toggleIsCommentsShown}
          >
            {isCommentsShown ? "Hide Comments" : "Show Comments"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedPost;
