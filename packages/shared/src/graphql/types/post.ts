import { Field, ID, InterfaceType, ObjectType } from '@nestjs/graphql'
import { PaginatedResponseInterface } from '../interfaces/paginated'
import { User } from './user'
import { Node } from './node'
import { PostCate } from './post-cate'
import { Comment } from './comment'
import { PostExtend } from './post-extend'

@InterfaceType({
  resolveType: value => {
    if ('collection' in value) return PostCollection
    return PostNormal
  }
})
export abstract class Post {
  @Field(type => ID)
  id: string

  @Field()
  title: string

  @Field()
  content: string

  @Field()
  createAt: Date

  @Field()
  updateAt: Date

  @Field()
  authorId: number

  @Field(type => User)
  author: User

  @Field()
  nodeId: number

  @Field(type => Node)
  node: Node

  @Field(type => [Node])
  nodePath: Node[]

  @Field()
  cateId: string

  @Field(type => PostCate)
  cate: PostCate

  @Field(type => [Comment])
  comments: Comment[]

  @Field(type => PostExtend)
  extend: PostExtend
}

@ObjectType({ implements: Post })
export class PostNormal extends Post {}

@ObjectType()
class PostCollectionItem {
  @Field(type => PostNormal)
  item: PostNormal

  @Field()
  order: number
}

@ObjectType({ implements: Post })
export class PostCollection extends Post {
  @Field(type => [PostCollectionItem])
  collection: PostCollectionItem[]
}

@ObjectType()
export class PostPaginatedResponse implements PaginatedResponseInterface<Post> {
  @Field(type => [Post])
  items: Post[]

  @Field()
  total: number
}
