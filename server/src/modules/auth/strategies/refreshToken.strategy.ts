import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { AuthEnvKey, JWTPayload } from "../auth.types";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("refresh-token"),
      secretOrKey: configService.getOrThrow(AuthEnvKey.RefreshTokenSecret),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JWTPayload) {
    const accessToken = req.headers?.["authorization"]?.split(" ")[1];

    const refreshToken = (req.headers?.["refresh-token"] as string)?.split(
      " ",
    )[1];

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const userToken = await this.prismaService.userTokens.findFirst({
      where: {
        accessToken,
        refreshToken,
        userId: payload.id,
      },
      include: {
        user: true,
      },
    });

    if (!userToken) {
      throw new UnauthorizedException();
    }

    return userToken.user;
  }
}
