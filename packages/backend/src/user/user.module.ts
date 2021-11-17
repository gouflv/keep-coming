import { forwardRef, Module } from '@nestjs/common'
import { PostModule } from 'src/post/post.module'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [forwardRef(() => PostModule)],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
