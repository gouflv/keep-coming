import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Post } from './post'
import { Comment } from './comment'

@ObjectType()
export class User {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  email?: string

  @Field()
  isEmailValidate: boolean

  @Field({ nullable: true })
  avatar?: string

  @Field()
  createAt: Date

  @Field(type => [Post], {
    description: "A list of user's posts"
  })
  posts: Post[]

  @Field(type => [Comment])
  comments: Comment[]

  @Field(type => [Post], {
    description: "A list of user's posts"
  })
  likedPosts: Post[]

  @Field(type => [Post], {
    description: "A list of user's posts"
  })
  savedPosts: Post[]
}
