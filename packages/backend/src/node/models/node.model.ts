import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Node {
  @Field(type => ID)
  id: number

  @Field()
  name: string

  @Field()
  parentId: string

  // @Field()
  // children: Node[]
}