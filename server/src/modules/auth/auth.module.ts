import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "./strategies/accessToken.strategy";
import { RefreshTokenStrategy } from "./strategies/refreshToken.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [UsersModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
