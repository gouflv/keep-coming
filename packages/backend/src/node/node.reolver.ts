import { ParseIntPipe } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Node } from './models/node.model'
import { NodeService } from './node.service'

@Resolver(of => Node)
export class NodeResolver {
  constructor(private nodeService: NodeService) {}

  @Query(returns => Node)
  async node(@Args('id', ParseIntPipe) id: number) {
    return this.nodeService.findOne({ id })
  }

  @Query(returns => [Node])
  async nodes() {
    return this.nodeService.findMany({
      parentId: { equals: 0 },
    })
  }
}
