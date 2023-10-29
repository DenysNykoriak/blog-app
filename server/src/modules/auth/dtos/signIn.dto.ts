import { IsEmail, IsString, MinLength } from "class-validator";

export class SignInDTO {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(1)
  public password: string;
}
