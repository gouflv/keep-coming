import { ParseIntPipe } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Post, PostsArgs } from 'src/post'
import { PostService } from '../post/post.service'
import { AddUserInput } from './types/user.input'
import { User } from './types/user.model'
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

  @ResolveField(type => [Post])
  async posts(@Parent() user: User, @Args() args: PostsArgs) {
    return this.postService.findMany(
      {
        authorId: user.id,
      },
      args,
    )
  }

  @Mutation(returns => User)
  async register(@Args('addUserInput') input: AddUserInput) {
    return this.userService.create(input)
  }
}
