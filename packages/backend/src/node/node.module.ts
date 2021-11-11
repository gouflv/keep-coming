import { Module } from '@nestjs/common'
import { NodeService } from './node.service'

@Module({
  providers: [NodeService],
})
export class NodeModule {}
