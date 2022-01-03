import { ParseIntPipe } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql'
import { PostService } from '../post/post.service'
import { UserCreateInput } from './inputs/UserCreateInput'
import { UserService } from './user.service'
import { Post, User } from '@kc/shared'
import { PaginatedArgs } from '../utils/graphql'

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  @Query(returns => User, { description: 'Look up a user' })
  async user(@Args('id') id: string) {
    return this.userService.findOne({ id })
  }

  @ResolveField(type => [Post])
  async posts(@Parent() user: User, @Args() args: PaginatedArgs) {
    return this.postService.findMany({
      filter: { authorId: user.id }
    })
  }

  @Mutation(returns => User)
  async register(@Args('data') input: UserCreateInput) {
    return this.userService.create(input)
  }
}
