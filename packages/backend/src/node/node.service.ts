import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../core/prisma.service'

@Injectable()
export class NodeService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.NodeWhereUniqueInput) {
    return this.prisma.node.findFirst({ where })
  }

  async findMany(where?: Prisma.NodeWhereInput) {
    return this.prisma.node.findMany({
      where,
      orderBy: { sort: 'asc' }
    })
  }
}
