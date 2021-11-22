import { forwardRef, Module } from '@nestjs/common'
import { NodeModule } from '../node/node.module'
import { UserModule } from '../user/user.module'
import { PostResolver } from './post.resolver'
import { PostService } from './post.service'

@Module({
  imports: [forwardRef(() => NodeModule), forwardRef(() => UserModule)],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
