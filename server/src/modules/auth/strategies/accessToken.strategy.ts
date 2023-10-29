import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Request } from "express";
import { AuthEnvKey, JWTPayload } from "../auth.types";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-access",
) {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow(AuthEnvKey.AccessTokenSecret),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JWTPayload) {
    const accessToken = req.headers?.["authorization"]?.split(" ")[1];

    const userToken = await this.prismaService.userTokens.findFirst({
      where: {
        accessToken,
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
