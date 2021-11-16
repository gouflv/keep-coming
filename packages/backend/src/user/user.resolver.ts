import { ParseIntPipe } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Post, PostsArgs } from 'src/post/models'
import { PostService } from '../post/post.service'
import { User } from './models/user.model'
import { UserService } from './user.service'

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  @Query(returns => User, { description: 'Look up a user' })
  async user(@Args('id', ParseIntPipe) id: number) {
    return this.userService.findOne({ id })
  }

  @ResolveField(type => [Post], {
    description: 'A list of posts make by this user',
  })
  async posts(@Parent() user: User, @Args() args: PostsArgs) {
    return this.postService.findMany(
      {
        authorId: { equals: user.id },
      },
      args,
    )
  }
}
