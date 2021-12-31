import { Args, Query, Resolver } from '@nestjs/graphql'
import { Node } from '@kc/shared'
import { NodeService } from './node.service'

@Resolver(of => Node)
export class NodeResolver {
  constructor(private nodeService: NodeService) {}

  @Query(returns => Node, { nullable: true, description: 'Look up a node' })
  async node(@Args('id') id: string) {
    return this.nodeService.findOne({ id })
  }

  @Query(returns => [Node], { description: 'A list of nodes' })
  async nodes() {
    return this.nodeService.findMany({})
  }
}
