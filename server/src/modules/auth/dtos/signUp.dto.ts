import { IsEmail, IsString, Length, Matches } from "class-validator";

export class SignUpDTO {
  @IsString()
  @Length(3, 30)
  fname: string;

  @IsString()
  @Length(3, 30)
  lname: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 30)
  nickname: string;

  @IsString()
  @Length(8, 60, { message: "Password is weak" })
  @Matches(/^(?=.*[0-9])(?=.*[A-Z]).{8,}$/, {
    message: "Password is weak",
  })
  password: string;
}
