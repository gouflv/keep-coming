import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PostCate } from './post-cate'

@ObjectType()
export class Node {
  @Field(_type => ID)
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  icon?: string

  @Field(_type => [PostCate])
  cate: PostCate[]

  @Field()
  parentId: string

  @Field({ nullable: true })
  parent?: Node

  @Field(_type => [Node])
  children: Node[]
}
