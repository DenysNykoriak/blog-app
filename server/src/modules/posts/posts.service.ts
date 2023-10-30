import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDTO } from "./dtos/post.dto";
import { User } from "@prisma/client";
import { CreateCommentDTO } from "./dtos/comment.dto";

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
      include: {
        author: true,
        Comments: {
          where: {
            rootCommentId: null,
          },
          include: {
            author: true,
            NestedComments: { include: { author: true } },
          },
        },
      },
    });

    return postsFeed;
  }

  async createComment(author: User, createCommentDTO: CreateCommentDTO) {
    const post = await this.prismaService.post.findFirst({
      where: { id: createCommentDTO.postId },
    });

    if (!post) throw new BadRequestException("Post not found");

    if (createCommentDTO.rootCommentId) {
      const rootComment = await this.prismaService.comment.findFirst({
        where: { id: createCommentDTO.rootCommentId },
      });

      if (!rootComment) throw new BadRequestException("Root comment not found");

      if (rootComment.rootCommentId)
        throw new BadRequestException("Root comment is nested comment");
    }

    const newComment = await this.prismaService.comment.create({
      data: {
        postId: createCommentDTO.postId,
        content: createCommentDTO.content,
        authorId: author.id,
        rootCommentId: createCommentDTO.rootCommentId,
      },
      include: {
        author: true,
      },
    });

    return newComment;
  }
}
