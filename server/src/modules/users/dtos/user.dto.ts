import { User } from "@prisma/client";

export class UserDTO {
  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.fname = user.fname;
    this.lname = user.lname;
    this.email = user.email;
    this.bio = user.bio;

    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  id: string;
  nickname: string;
  fname: string;
  lname: string;
  email: string;
  bio: string;

  createdAt: Date;
  updatedAt: Date;
}
