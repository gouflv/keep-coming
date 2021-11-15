import { ParseIntPipe } from '@nestjs/common'
import { Args, Query, ResolveField, Resolver, Parent } from '@nestjs/graphql'
import { PostService } from '../post/post.service'
import { PaginationArgs } from '../utils'
import { User } from './models/user.model'
import { UserService } from './user.service'

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  @Query(returns => User)
  async user(@Args('id', ParseIntPipe) id: number) {
    return this.userService.findOne({ id })
  }

  @ResolveField()
  async posts(@Parent() user: User, @Args() page: PaginationArgs) {
    return this.postService.findMany(
      {
        authorId: { equals: user.id },
      },
      page,
    )
  }
}
