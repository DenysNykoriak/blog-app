import classNames from "classnames";
import React from "react";

import Link from "next/link";

import { Route } from "@/models/routes";
import { User } from "@/modules/user";

type Props = {
  user: User;
  isRingHidden?: boolean;
  size?: "small" | "medium";
};

const UserAvatar = ({ user, size = "medium", isRingHidden }: Props) => (
  <Link href={`${Route.Profile}/${user.nickname}`}>
    <div className="avatar placeholder">
      <div
        className={classNames(
          "rounded-full bg-neutral-focus text-neutral-content",
          {
            "ring-1 ring-primary": !isRingHidden,
            "w-14": size === "medium",
            "w-10": size === "small",
          },
        )}
      >
        <span
          className={classNames({
            "text-xl": size === "medium",
            "text-lg": size === "small",
          })}
        >
          {user.fname.charAt(0)}
          {user.lname.charAt(0)}
        </span>
      </div>
    </div>
  </Link>
);

export default UserAvatar;
