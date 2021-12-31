import { ParseIntPipe, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql'
import { GqlAuthGuard, GqlAuthPayload, JwtPayload } from '../auth'
import { UserService } from '../user/user.service'
import { NodeService } from '../node/node.service'
import { PostService } from './post.service'
import { PostPaginatedArgs } from './args/paginated.args'
import { Post, PostPaginatedResponse } from '@kc/shared'
import { PostFindManyFilter } from './args/find-many-filter.args'
import { CreatePostInput } from './inputs/create.input'

@Resolver(of => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private nodeService: NodeService,
    private userService: UserService
  ) {}

  @Query(returns => Post, { description: 'Look up a post' })
  async post(@Args('id') id: string) {
    return this.postService.findOne({ id })
  }

  @Query(returns => PostPaginatedResponse, { description: 'A list of posts' })
  async posts(
    @Args() filter: PostFindManyFilter,
    @Args() args: PostPaginatedArgs
  ) {
    return {
      items: await this.postService.findMany(filter, args),
      total: await this.postService.count(filter)
    }
  }

  @ResolveField()
  async author(@Parent() post: Post) {
    return this.userService.findOne({ id: post.authorId })
  }

  @ResolveField()
  async node(@Parent() post: Post) {
    return this.nodeService.findOne({ id: post.nodeId })
  }

  @Mutation(returns => Post, { name: 'createPost' })
  @UseGuards(GqlAuthGuard)
  create(
    @GqlAuthPayload() payload: JwtPayload,
    @Args('data') input: CreatePostInput
  ) {
    return this.postService.create({
      ...input,
      authorId: payload.sub
    })
  }
}
