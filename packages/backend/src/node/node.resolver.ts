import { ParseIntPipe } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Node } from './models/node.model'
import { NodeService } from './node.service'

@Resolver(of => Node)
export class NodeResolver {
  constructor(private nodeService: NodeService) {}

  @Query(returns => Node, { description: 'Look up a node' })
  async node(@Args('id', ParseIntPipe) id: number) {
    return this.nodeService.findOne({ id })
  }

  @Query(returns => [Node], { description: 'A list of nodes' })
  async nodes() {
    return this.nodeService.findMany({
      parentId: { equals: 0 },
    })
  }

  @ResolveField()
  async children(@Parent() parent: Node) {
    return this.nodeService.findMany({
      parentId: { equals: parent.id },
    })
  }
}
