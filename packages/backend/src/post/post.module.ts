import { Module } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { NodeService } from '../node/node.service'
import { PostResolver } from './post.resolver'
import { PostService } from './post.service'

@Module({
  providers: [PostService, NodeService, UserService, PostResolver],
})
export class PostModule {}
