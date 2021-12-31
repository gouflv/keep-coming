import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PostCate {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  sort: number
}
