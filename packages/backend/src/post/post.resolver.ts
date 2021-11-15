import { ParseIntPipe } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { PaginationArgs } from 'src/utils'
import { NodeService } from '../node/node.service'
import { Post } from './models/post.model'
import { PostService } from './post.service'

@Resolver(of => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private nodeService: NodeService,
  ) {}

  @Query(returns => Post)
  async post(@Args('id', ParseIntPipe) id: number) {
    return this.postService.findOne({ id })
  }

  @Query(returns => [Post])
  async posts(@Args() page: PaginationArgs) {
    return this.postService.findMany({}, page)
  }

  @Query(returns => Number)
  async countOfPosts() {
    return this.postService.count({})
  }

  @ResolveField()
  async nodePath(@Parent() post: Post) {
    const node = await this.nodeService.findOne({
      id: post.nodeId,
    })
    return this.nodeService.getPathOf(node)
  }
}
