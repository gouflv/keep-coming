import { ParseIntPipe } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UserService } from 'src/user/user.service'
import { PaginationArgs } from 'src/utils/graphql'
import { NodeService } from '../node/node.service'
import { Post, PostsArgs } from './models'
import { PostService } from './post.service'

@Resolver(of => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private nodeService: NodeService,
    private userService: UserService,
  ) {}

  @Query(returns => Post, { description: 'Look up a post' })
  async post(@Args('id', ParseIntPipe) id: number) {
    return this.postService.findOne({ id })
  }

  @Query(returns => [Post], { description: 'A list of posts' })
  async posts(@Args() args: PostsArgs) {
    return this.postService.findMany({}, args)
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
