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
  },
})
export abstract class Post {
  @Field(_type => ID)
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

  @Field(_type => User)
  author: User

  @Field()
  nodeId: number

  @Field(_type => Node)
  node: Node

  @Field(_type => [Node])
  nodePath: Node[]

  @Field()
  cateId: string

  @Field(_type => PostCate)
  cate: PostCate

  @Field(_type => [Comment])
  comments: Comment[]

  @Field(_type => PostExtend)
  extend: PostExtend
}

@ObjectType({ implements: Post })
export class PostNormal extends Post {}

@ObjectType()
class PostCollectionItem {
  @Field(_type => PostNormal)
  item: PostNormal

  @Field()
  order: number
}

@ObjectType({ implements: Post })
export class PostCollection extends Post {
  @Field(_type => [PostCollectionItem])
  collection: PostCollectionItem[]
}

@ObjectType()
export class PostPaginatedResponse implements PaginatedResponseInterface<Post> {
  @Field(_type => [Post])
  items: Post[]

  @Field()
  total: number
}
