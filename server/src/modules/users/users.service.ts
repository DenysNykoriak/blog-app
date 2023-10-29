import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

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
}
