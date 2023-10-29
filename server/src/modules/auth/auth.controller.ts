import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDTO } from "./dtos/signUp.dto";
import { SignInDTO } from "./dtos/signIn.dto";

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
}
