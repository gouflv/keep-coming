import { Field, ID, InterfaceType } from '@nestjs/graphql'
import { User } from '../types/user'
import { Node } from '../types/node'
import { PostCate } from '../types/post-cate'
import { Comment } from '../types/comment'
import { PostExtend } from '../types/post-extend'

@InterfaceType()
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
