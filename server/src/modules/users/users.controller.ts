import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { UsersService } from "./users.service";
import { AccessTokenGuard } from "../auth/guards/accessToken.guard";
import { UserDTO } from "./dtos/user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("/current")
  @UseGuards(AccessTokenGuard)
  getCurrentUser(@Req() req: Request) {
    return new UserDTO(req.user);
  }
}
