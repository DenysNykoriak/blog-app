import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AccessTokenGuard } from "../auth/guards/accessToken.guard";
import { CreatePostDTO, PostDTO } from "./dtos/post.dto";
import { Request } from "express";

@Controller("posts")
@UseGuards(AccessTokenGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get("/feed")
  async getFeed(
    @Query("limit") rawLimit: string,
    @Query("skip") rawSkip: string,
  ) {
    const limit = rawLimit ? Number(rawLimit) : undefined;
    const skip = rawSkip ? Number(rawSkip) : undefined;

    const feedPosts = await this.postsService.getFeed(limit, skip);

    return {
      posts: feedPosts.map((post) => new PostDTO(post)),
    };
  }

  @Post("/create")
  async createPost(@Body() createPostDTO: CreatePostDTO, @Req() req: Request) {
    const newPost = await this.postsService.createPost(req.user, createPostDTO);

    return new PostDTO(newPost);
  }
}
