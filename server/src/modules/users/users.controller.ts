import {
  Controller,
  Get,
  Req,
  UseGuards,
  Param,
  BadRequestException,
  Patch,
  Body,
} from "@nestjs/common";
import { Request } from "express";
import { UsersService } from "./users.service";
import { AccessTokenGuard } from "../auth/guards/accessToken.guard";
import { EditUserDTO, UserDTO } from "./dtos/user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("/current")
  @UseGuards(AccessTokenGuard)
  getCurrentUser(@Req() req: Request) {
    return new UserDTO(req.user);
  }

  @Get("/all/:nickname")
  async getUserInfo(@Param("nickname") nickname: string) {
    const user = await this.usersService.getUserByNickname(nickname);

    if (!user) throw new BadRequestException("User not found");

    return new UserDTO(user);
  }

  @Patch("/edit")
  @UseGuards(AccessTokenGuard)
  async editProfileInfo(@Body() editUserDTO: EditUserDTO, @Req() req: Request) {
    const updatedUser = await this.usersService.editProfileInfo(
      req.user,
      editUserDTO,
    );

    return new UserDTO(updatedUser);
  }
}
