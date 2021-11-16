import { Injectable } from '@nestjs/common'
import { Post, Prisma } from '@prisma/client'
import { PrismaService } from 'src/core/prisma.service'
import { PostOrderField, PostsArgs } from './models'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({ where })
  }

  async findMany(
    where: Prisma.PostWhereInput,
    args: PostsArgs,
  ): Promise<Post[]> {
    return this.prisma.post.findMany({
      where,
      skip: args.skip,
      take: args.take,
      orderBy: [
        {
          [args.order.field]: args.order.direction,
        },
        {
          create_at: args.order.direction,
        },
      ],
    })
  }

  async count(where: Prisma.PostWhereInput): Promise<number> {
    return this.prisma.post.count({ where })
  }

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data })
  }

  async update(params: {
    where: Prisma.PostWhereUniqueInput
    data: Prisma.PostUncheckedUpdateInput
  }): Promise<Post> {
    return this.prisma.post.update(params)
  }

  async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({ where })
  }
}
