import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Post } from './post'
import { User } from './user'

@ObjectType()
export class Comment {
  @Field(type => ID)
  id: string

  @Field()
  postId: string

  @Field(type => Post)
  post: Post

  @Field()
  authorId: string

  @Field(type => User)
  author: User

  @Field()
  content: string

  @Field()
  createAt: Date

  @Field(type => Comment)
  parent?: Comment

  @Field(type => [Comment])
  children: Comment[]
}
