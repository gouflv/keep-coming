import { ParseIntPipe } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserService } from 'src/user/user.service'
import { PaginationArgs } from 'src/utils'
import { NodeService } from '../node/node.service'
import { Post } from './models/post.model'
import { PostsArgs, PostSort } from './models/posts.args'
import { PostService } from './post.service'

@Resolver(of => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private nodeService: NodeService,
    private userService: UserService,
  ) {}

  @Query(returns => Post)
  async post(@Args('id', ParseIntPipe) id: number) {
    return this.postService.findOne({ id })
  }

  @Query(returns => [Post])
  async posts(@Args() page: PaginationArgs, @Args() args: PostsArgs) {
    return this.postService.findMany(
      {},
      page,
      args.sort === PostSort.CREATE
        ? [{ create_at: 'desc' }]
        : [{ [args.sort]: 'desc' }, { create_at: 'desc' }],
    )
  }

  @Query(returns => Number)
  async countOfPosts() {
    return this.postService.count({})
  }

  @ResolveField()
  async author(@Parent() post: Post) {
    return this.userService.findOne({ id: post.authorId })
  }

  @ResolveField()
  async node(@Parent() post: Post) {
    return this.nodeService.findOne({ id: post.nodeId })
  }

  @ResolveField()
  async nodePath(@Parent() post: Post) {
    const node = await this.nodeService.findOne({
      id: post.nodeId,
    })
    return this.nodeService.getPathOf(node)
  }
}
