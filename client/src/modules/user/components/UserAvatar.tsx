import React from "react";

type Props = {
  fname: string;
  lname: string;
};

const UserAvatar = ({ fname, lname }: Props) => (
  <div className="avatar placeholder">
    <div className="w-14 rounded-full bg-neutral-focus text-neutral-content ring-1 ring-primary ">
      <span className="text-xl">
        {fname.charAt(0)}
        {lname.charAt(0)}
      </span>
    </div>
  </div>
);

export default UserAvatar;
