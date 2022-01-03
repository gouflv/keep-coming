import { Injectable } from '@nestjs/common'
import { Post, Prisma } from '@prisma/client'
import { PrismaService } from '../core/prisma.service'
import { FindManyPostParams } from './post.types'
import { PostFilterArgs } from './args/filter.args'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.PostWhereUniqueInput) {
    return this.prisma.post.findUnique({ where })
  }

  async findMany({ filter, order, paginated }: FindManyPostParams) {
    // Filter
    const where = this.findManyWhereInputBuilder(filter)

    // Order
    // const orderBy = (() => {
    //   const res: Record<string, any> = [
    //     {
    //       [order.type]: order.direction
    //     }
    //   ]
    //   if (order.type === PostOrderType.LAST_COMMENT_AT) {
    //     res.push({
    //       createAt: order.direction
    //     })
    //   }
    //   return res
    // })()

    return this.prisma.post.findMany({
      where,
      // orderBy,
      take: paginated?.take,
      skip: paginated?.skip
    })
  }

  async count(filter: PostFilterArgs): Promise<number> {
    const where = this.findManyWhereInputBuilder(filter)
    return this.prisma.post.count({ where })
  }

  private findManyWhereInputBuilder(filter?: PostFilterArgs) {
    const where: Prisma.PostWhereInput = {}
    if (!filter) return where

    const { authorId, nodeId, categoryId } = filter
    if (authorId) {
      where['authorId'] = { equals: authorId }
    }
    if (nodeId) {
      where['nodeId'] = { equals: nodeId }
    }
    if (categoryId) {
      where['categoryId'] = { equals: categoryId }
    }
    return where
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
