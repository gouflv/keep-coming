import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Post } from './post'
import { Comment } from './comment'

@ObjectType()
export class User {
  @Field(_type => ID)
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

  @Field(_type => [Post], {
    description: "A list of user's posts",
  })
  posts: Post[]

  @Field(_type => [Comment])
  comments: Comment[]

  @Field(_type => [Post], {
    description: "A list of user's posts",
  })
  likedPosts: Post[]

  @Field(_type => [Post], {
    description: "A list of user's posts",
  })
  savedPosts: Post[]
}
