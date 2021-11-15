import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Post } from 'src/post/models/post.model'

@ObjectType()
export class User {
  @Field(type => ID)
  id: number

  @Field()
  name: string

  @Field()
  email: string

  @Field(type => [Post])
  posts: Post[]
}
