import { Injectable } from '@nestjs/common'
import { Post, Prisma } from '@prisma/client'
import { PrismaService } from 'src/core/prisma.service'
import { PaginationArgs } from 'src/utils'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({ where })
  }

  async findMany(
    where: Prisma.PostWhereInput,
    page: PaginationArgs,
    orderBy?: Prisma.Enumerable<Prisma.PostOrderByWithRelationInput>,
  ): Promise<Post[]> {
    return this.prisma.post.findMany({
      where,
      skip: page.skip,
      take: page.take,
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
