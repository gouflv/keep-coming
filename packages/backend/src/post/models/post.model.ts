import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Node } from '../../node/models/node.model'

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

  @Field()
  nodeId: number

  @Field()
  authorId: number

  @Field(type => [Node])
  nodePath: Node[]
}
