import { Prisma } from "@prisma/client";
import { IsOptional, IsString, MinLength } from "class-validator";
import { UserDTO } from "src/modules/users/dtos/user.dto";

export class CommentDTO {
  constructor(
    comment: Prisma.CommentGetPayload<{
      include: {
        author: true;
      };
    }>,
    nestedComments?: Prisma.CommentGetPayload<{
      include: { NestedComments: { include: { author: true } } };
    }>["NestedComments"],
  ) {
    this.id = comment.id;
    this.author = new UserDTO(comment.author);
    this.postId = comment.postId;
    this.content = comment.content;
    this.rootCommentId = comment.rootCommentId;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;

    if (nestedComments) {
      this.nestedComments = nestedComments.map(
        (nestedComment) => new CommentDTO(nestedComment),
      );
    }
  }

  id: string;
  author: UserDTO;
  postId: string;

  content: string;

  createdAt: Date;
  updatedAt: Date;

  rootCommentId: string | null;
  nestedComments?: CommentDTO[];
}

export class CreateCommentDTO {
  @IsString()
  @MinLength(1)
  postId: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  rootCommentId?: string;

  @IsString()
  @MinLength(1)
  content: string;
}
