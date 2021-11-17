import { forwardRef, Module } from '@nestjs/common'
import { NodeModule } from 'src/node/node.module'
import { UserModule } from 'src/user/user.module'
import { PostResolver } from './post.resolver'
import { PostService } from './post.service'

@Module({
  imports: [forwardRef(() => NodeModule), forwardRef(() => UserModule)],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
