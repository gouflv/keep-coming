import { Field, ID, InterfaceType, ObjectType } from '@nestjs/graphql'
import { PaginatedResponseInterface } from '../interfaces/paginated'
import { User } from './user'
import { Node } from './node'
import { PostCategory } from './post-category'
import { Comment } from './comment'
import { PostExtendInfo } from './post-extend-info'

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

  authorId: string

  @Field(type => User)
  author: User

  nodeId: string

  @Field(type => Node)
  node: Node

  categoryId: string

  @Field(type => PostCategory)
  category: PostCategory

  @Field(type => [Comment])
  comments: Comment[]

  @Field(type => PostExtendInfo)
  extendInfo: PostExtendInfo
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
