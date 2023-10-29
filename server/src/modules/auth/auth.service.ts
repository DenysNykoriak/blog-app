import { Injectable, BadRequestException } from "@nestjs/common";
import { User } from "@prisma/client";
import { AuthEnvKey, JWTPayload } from "./auth.types";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { SignUpDTO } from "./dtos/signUp.dto";
import { hash, verify } from "argon2";
import { SignInDTO } from "./dtos/signIn.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  private createJWTPayload(user: User): JWTPayload {
    return {
      id: user.id,
      fname: user.fname,
      lname: user.lname,
      nickname: user.nickname,
      email: user.email,
    };
  }

  private async generateJWTTokens(payload: JWTPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow(AuthEnvKey.AccessTokenSecret),
        expiresIn: "1d",
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow(AuthEnvKey.RefreshTokenSecret),
        expiresIn: "0.5y",
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async saveJWTTokens(
    user: User,
    accessToken: string,
    refreshToken: string,
  ) {
    await this.prismaService.userTokens.deleteMany({
      where: {
        OR: [{ accessToken }, { refreshToken }],
      },
    });

    const allUserTokens = await this.prismaService.userTokens.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    //delete other sessions when one user has more than 5 sessions
    const userTokenIdsToDelete = allUserTokens
      .slice(4)
      .map((userTokens) => userTokens.id);

    if (userTokenIdsToDelete.length) {
      await this.prismaService.userTokens.deleteMany({
        where: {
          id: { in: userTokenIdsToDelete },
        },
      });
    }

    await this.prismaService.userTokens.create({
      data: {
        accessToken,
        refreshToken,
        userId: user.id,
      },
    });
  }

  async signUp(signUpDTO: SignUpDTO) {
    const emailCandidate = await this.usersService.getUserByEmail(
      signUpDTO.email,
    );

    if (emailCandidate) throw new BadRequestException("Email already taken");

    const nicknameCandidate = await this.usersService.getUserByNickname(
      signUpDTO.nickname,
    );

    if (nicknameCandidate)
      throw new BadRequestException("Nickname already taken");

    const userPassword = await hash(signUpDTO.password);

    const user = await this.prismaService.user.create({
      data: {
        email: signUpDTO.email,
        fname: signUpDTO.fname,
        lname: signUpDTO.lname,
        nickname: signUpDTO.nickname,
        password: userPassword,
      },
    });

    const payload = this.createJWTPayload(user);

    const tokens = await this.generateJWTTokens(payload);

    await this.saveJWTTokens(user, tokens.accessToken, tokens.refreshToken);

    return tokens;
  }

  async signIn(signInDTO: SignInDTO) {
    const emailCandidate = await this.usersService.getUserByEmail(
      signInDTO.email,
    );

    if (!emailCandidate) {
      throw new BadRequestException("Invalid email or password");
    }

    try {
      const isPasswordsSame = await verify(
        emailCandidate.password,
        signInDTO.password,
      );

      if (isPasswordsSame) {
        const payload = this.createJWTPayload(emailCandidate);

        const tokens = await this.generateJWTTokens(payload);

        await this.saveJWTTokens(
          emailCandidate,
          tokens.accessToken,
          tokens.refreshToken,
        );

        return tokens;
      }
    } catch {}

    throw new BadRequestException("Invalid email or password");
  }
}
