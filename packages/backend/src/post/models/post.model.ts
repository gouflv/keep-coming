import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Post {
  @Field(type => ID)
  id: number

  @Field()
  title: string

  @Field()
  content: string

  @Field()
  create_at: Date
}
