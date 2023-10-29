import { Prisma } from "@prisma/client";
import { IsString, MinLength } from "class-validator";
import { UserDTO } from "src/modules/users/dtos/user.dto";

export class PostDTO {
  constructor(
    post: Prisma.PostGetPayload<{
      include: {
        author: true;
      };
    }>,
  ) {
    this.id = post.id;
    this.content = post.content;
    this.author = new UserDTO(post.author);

    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }

  id: string;
  author: UserDTO;

  content: string;

  createdAt: Date;
  updatedAt: Date;
}

export class CreatePostDTO {
  @IsString()
  @MinLength(1)
  content: string;
}
