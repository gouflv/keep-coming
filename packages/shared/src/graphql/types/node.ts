import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { PostCate } from './post-cate'

export enum NodeGroup {
  DEFAULT = 'DEFAULT',
  GAME = 'GAME'
}
registerEnumType(NodeGroup, {
  name: 'NodeGroup'
})

@ObjectType()
export class Node {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  icon?: string

  @Field()
  sort: number

  @Field()
  createAt: Date

  @Field(type => NodeGroup)
  group: NodeGroup

  @Field(type => [PostCate])
  postCateList: PostCate[]
}
