import { Prisma } from "@prisma/client";
import { IsString, MinLength } from "class-validator";
import { UserDTO } from "src/modules/users/dtos/user.dto";
import { CommentDTO } from "./comment.dto";

export class PostDTO {
  constructor(
    post: Prisma.PostGetPayload<{
      include: {
        author: true;
      };
    }>,
    comments?: Prisma.PostGetPayload<{
      include: {
        Comments: {
          include: {
            author: true;
            NestedComments: { include: { author: true } };
          };
        };
      };
    }>["Comments"],
  ) {
    this.id = post.id;
    this.content = post.content;
    this.author = new UserDTO(post.author);

    if (comments) {
      this.comments = comments.map(
        (comment) => new CommentDTO(comment, comment.NestedComments),
      );
    }

    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }

  id: string;
  author: UserDTO;

  content: string;

  comments: CommentDTO[];

  createdAt: Date;
  updatedAt: Date;
}

export class CreatePostDTO {
  @IsString()
  @MinLength(1)
  content: string;
}
