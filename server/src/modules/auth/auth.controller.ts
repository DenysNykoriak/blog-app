import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDTO } from "./dtos/signUp.dto";
import { SignInDTO } from "./dtos/signIn.dto";
import { RefreshTokenGuard } from "./guards/refreshToken.guard";
import { Request } from "express";
import { AccessTokenGuard } from "./guards/accessToken.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signUp")
  async signUp(@Body() signUpDTO: SignUpDTO) {
    const signUpInfo = await this.authService.signUp(signUpDTO);

    return {
      accessToken: signUpInfo.accessToken,
      refreshToken: signUpInfo.refreshToken,
    };
  }

  @Post("signIn")
  async signIn(@Body() signUpDTO: SignInDTO) {
    const signInInfo = await this.authService.signIn(signUpDTO);

    return {
      accessToken: signInInfo.accessToken,
      refreshToken: signInInfo.refreshToken,
    };
  }

  @UseGuards(RefreshTokenGuard)
  @Post("/refreshToken")
  @HttpCode(200)
  async refreshToken(
    @Req() req: Request,
    @Headers("refresh-token") refreshToken: string,
  ) {
    const { accessToken } = await this.authService.refreshToken(
      req.user,
      refreshToken,
    );

    return { accessToken };
  }

  @UseGuards(RefreshTokenGuard, AccessTokenGuard)
  @Get("signOut")
  async signOut(@Headers("Refresh-Token") refreshToken: string) {
    await this.authService.signOut(refreshToken);

    return { success: true };
  }
}
