import { Injectable } from '@nestjs/common'
import { Post, Prisma } from '@prisma/client'
import { PrismaService } from 'src/core/prisma.service'
import { PostFilter, PostOrderField, PostsArgs } from './types/post.args'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({ where })
  }

  async findMany(filter: PostFilter, args: PostsArgs): Promise<Post[]> {
    const where = (() => {
      const res: Prisma.PostWhereInput = {}
      if (filter.authorId) {
        res['authorId'] = { equals: filter.authorId }
      }
      if (filter.nodeId) {
        res['nodeId'] = { equals: filter.nodeId }
      }
      return res
    })()

    const orderBy = (() => {
      const res: Prisma.PostOrderByWithRelationInput[] = [
        {
          [args.order.field]: args.order.direction,
        },
      ]
      if (args.order.field === PostOrderField.LAST_REPLY_AT) {
        res.push({
          create_at: args.order.direction,
        })
      }
      return res
    })()

    return this.prisma.post.findMany({
      where,
      skip: args.skip,
      take: args.take,
      orderBy,
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
