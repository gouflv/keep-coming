import { Injectable } from '@nestjs/common'
import { Post, Prisma } from '@prisma/client'
import { PrismaService } from '../core/prisma.service'
import { PostOrderType, PostPaginatedArgs } from './args/paginated.args'
import { PostFindManyFilter } from './args/find-many-filter.args'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({ where })
  }

  findManyWhereInputBuilder({ authorId, nodeId }: PostFindManyFilter) {
    const res: Prisma.PostWhereInput = {}
    if (authorId) {
      res['authorId'] = { equals: authorId }
    }
    if (nodeId) {
      res['nodeId'] = { equals: nodeId }
    }
    return res
  }

  async findMany(
    filter: PostFindManyFilter,
    { order, cursor, take }: PostPaginatedArgs
  ): Promise<Post[]> {
    const where = this.findManyWhereInputBuilder(filter)

    const orderBy = (() => {
      const res: Record<string, any> = [
        {
          [order.type]: order.direction
        }
      ]
      if (order.type === PostOrderType.LAST_COMMENT_AT) {
        res.push({
          createAt: order.direction
        })
      }
      return res
    })()

    return this.prisma.post.findMany({
      where,
      orderBy,
      cursor: { id: cursor },
      take
    })
  }

  async count(filter: PostFindManyFilter): Promise<number> {
    const where = this.findManyWhereInputBuilder(filter)
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
