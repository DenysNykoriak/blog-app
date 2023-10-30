import classNames from "classnames";
import React, { useState } from "react";

import { Comment, Post } from "..";

import CreateCommentForm from "./CreateCommentForm";

type Props = {
  postId: Post["id"];
  rootCommentId: Comment["id"];
};

const AddReplyBubble = ({ postId, rootCommentId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={classNames("chat-bubble", {
        "max-w-[400px] w-full": isOpen,
      })}
    >
      {isOpen ? (
        <CreateCommentForm postId={postId} rootCommentId={rootCommentId} />
      ) : (
        <button className="link-hover link" onClick={() => setIsOpen(true)}>
          + Add reply
        </button>
      )}
    </div>
  );
};

export default AddReplyBubble;
