import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Post } from 'src/post/types/post.model'

@ObjectType()
export class User {
  @Field(type => ID)
  id: number

  @Field()
  name: string

  @Field()
  email: string

  password: string

  @Field(type => [Post], {
    description: "A list of user's posts",
  })
  posts?: Post[]
}
