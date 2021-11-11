import { ParseIntPipe } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { PaginationArgs } from 'src/utils'
import { Post } from './models/post.model'
import { PostService } from './post.service'

@Resolver(of => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(returns => Post)
  async post(@Args('id', ParseIntPipe) id: number) {
    return this.postService.findOne({ id })
  }

  @Query(returns => [Post])
  async posts(@Args() page: PaginationArgs) {
    return this.postService.findMany({}, page)
  }
}
