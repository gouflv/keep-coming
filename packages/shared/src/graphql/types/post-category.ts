import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PostCategory {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  sort: number
}
