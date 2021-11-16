import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from 'src/user/types/user.model'
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

  @Field({ nullable: true })
  last_reply_at: Date

  @Field()
  authorId: number

  @Field(type => User)
  author: User

  @Field()
  nodeId: number

  @Field(type => Node)
  node: Node

  @Field(type => [Node])
  nodePath: Node[]
}
