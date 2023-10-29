import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDTO } from "./dtos/post.dto";
import { User } from "@prisma/client";

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async createPost(author: User, createPostDTO: CreatePostDTO) {
    const newPost = await this.prismaService.post.create({
      data: {
        authorId: author.id,
        content: createPostDTO.content,
      },
      include: { author: true },
    });

    return newPost;
  }

  async getFeed(limit: number = 10, skip: number = 0) {
    const postsFeed = await this.prismaService.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });

    return postsFeed;
  }
}
