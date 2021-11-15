import { Module } from '@nestjs/common'
import { PostService } from '../post/post.service'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  providers: [UserService, PostService, UserResolver],
})
export class UserModule {}
