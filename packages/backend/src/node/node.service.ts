import { Injectable } from '@nestjs/common'
import { Prisma, Node } from '@prisma/client'
import { PrismaService } from 'src/core/prisma.service'

@Injectable()
export class NodeService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.NodeWhereUniqueInput): Promise<Node | null> {
    return this.prisma.node.findUnique({ where })
  }

  async findMany(where?: Prisma.NodeWhereInput) {
    return this.prisma.node.findMany({
      where,
      orderBy: { sort: 'asc' },
    })
  }

  async getPathOf(node: Node) {
    const path: Node[] = []

    const walker = async (curr: Node) => {
      const parent = await this.findOne({ id: curr.parentId })
      if (!parent) return
      path.push(parent)
      walker(parent)
    }

    await walker(node)

    return [...path, node]
  }
}
