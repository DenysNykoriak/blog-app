import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { EditUserDTO } from "./dtos/user.dto";
import { hash, verify } from "argon2";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async hashPassword(rawPassword: string) {
    return hash(rawPassword);
  }

  async verifyPassword(hashedPassword: string, rawPassword: string) {
    try {
      const isPasswordsSame = await verify(hashedPassword, rawPassword);

      return isPasswordsSame;
    } catch {
      return false;
    }
  }

  async getUserByNickname(nickname: string) {
    const nicknameCandidate = await this.prismaService.user.findFirst({
      where: { nickname },
    });

    return nicknameCandidate;
  }

  async getUserByEmail(email: string) {
    const emailCandidate = await this.prismaService.user.findFirst({
      where: { email },
    });

    return emailCandidate;
  }

  async createUser(
    userInfo: Pick<
      Prisma.UserCreateInput,
      "bio" | "email" | "fname" | "lname" | "nickname" | "password"
    >,
  ) {
    const userPassword = await this.hashPassword(userInfo.password);

    const user = await this.prismaService.user.create({
      data: {
        ...userInfo,
        password: userPassword,
      },
    });

    return user;
  }

  async editProfileInfo(user: User, editUserDTO: EditUserDTO) {
    if (editUserDTO.email && user.email !== editUserDTO.email) {
      const emailCandidate = await this.getUserByEmail(editUserDTO.email);

      if (emailCandidate) throw new BadRequestException("Email already taken");
    }

    if (editUserDTO.nickname && user.nickname !== editUserDTO.nickname) {
      const nicknameCandidate = await this.getUserByNickname(
        editUserDTO.nickname,
      );

      if (nicknameCandidate)
        throw new BadRequestException("Email already taken");
    }

    const userPassword = editUserDTO.password
      ? await this.hashPassword(editUserDTO.password)
      : user.password;

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        bio: editUserDTO.bio,
        email: editUserDTO.email,
        nickname: editUserDTO.nickname,
        fname: editUserDTO.fname,
        lname: editUserDTO.lname,
        password: userPassword,
      },
    });

    return updatedUser;
  }
}
