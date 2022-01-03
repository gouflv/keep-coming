import { Injectable } from '@nestjs/common'
import { PrismaService } from '../core/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class PostCategoryService {
  constructor(private prisma: PrismaService) {}

  async postCategory(where: Prisma.PostCategoryWhereUniqueInput) {
    return this.prisma.postCategory.findUnique({ where })
  }

  async postCategories(where: Prisma.PostCategoryWhereInput) {
    return this.prisma.postCategory.findMany({
      where,
      orderBy: {
        sort: 'asc'
      }
    })
  }
}
