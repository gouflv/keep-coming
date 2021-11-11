import { Module } from '@nestjs/common'
import { NodeResolver } from './node.reolver'
import { NodeService } from './node.service'

@Module({
  providers: [NodeService, NodeResolver],
})
export class NodeModule {}
