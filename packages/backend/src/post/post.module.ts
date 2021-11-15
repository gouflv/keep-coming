import { Module } from '@nestjs/common'
import { NodeService } from '../node/node.service'
import { PostResolver } from './post.resolver'
import { PostService } from './post.service'

@Module({
  providers: [PostService, NodeService, PostResolver],
})
export class PostModule {}
