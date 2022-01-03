import { Module } from '@nestjs/common'
import { NodeResolver } from './resolvers/node.resolver'
import { NodeService } from './node.service'
import { PostCategoryModule } from '../post-category/post-category.module'
import { NodePostCategoryResolver } from './resolvers/post-category.resolver'

@Module({
  imports: [PostCategoryModule],
  providers: [NodeService, NodeResolver, NodePostCategoryResolver],
  exports: [NodeService]
})
export class NodeModule {}
