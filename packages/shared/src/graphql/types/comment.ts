import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Post } from './post'
import { User } from './user'

@ObjectType()
export class Comment {
  @Field(_type => ID)
  id: string

  @Field()
  postId: string

  @Field(_type => Post)
  post: Post

  @Field()
  authorId: string

  @Field(_type => User)
  author: User

  @Field()
  content: string

  @Field()
  createAt: Date

  @Field(_type => Comment)
  parent?: Comment

  @Field(_type => [Comment])
  children: Comment[]
}
