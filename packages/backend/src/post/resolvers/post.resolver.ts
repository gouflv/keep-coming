import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql'
import { GqlAuthGuard, GqlAuthPayload, JwtPayload } from '../../auth'
import { UserService } from '../../user/user.service'
import { NodeService } from '../../node/node.service'
import { PostService } from '../post.service'
import { Post, PostPaginatedResponse } from '@kc/shared'
import { CreatePostInput } from '../inputs/create.input'
import { PostFilterArgs } from '../args/filter.args'
import { PostOrderArgs } from '../args/order.args'
import { PaginatedArgs } from '../../utils/graphql'

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
    @Args() filter: PostFilterArgs,
    @Args() order: PostOrderArgs,
    @Args() paginated: PaginatedArgs
  ) {
    return {
      items: await this.postService.findMany({
        filter,
        order: order.order,
        paginated
      }),
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
