import { User } from "@prisma/client";
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";

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

export class EditUserDTO {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  fname?: string;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  lname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  nickname?: string;

  @IsOptional()
  @IsString()
  @Length(8, 60, { message: "Password is weak" })
  @Matches(/^(?=.*[0-9])(?=.*[A-Z]).{8,}$/, {
    message: "Password is weak",
  })
  password?: string;

  @IsOptional()
  @IsString()
  @Length(1, 300)
  bio?: string;
}
