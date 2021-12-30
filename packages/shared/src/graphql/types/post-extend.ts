import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PostExtend {
  @Field()
  visitCount: number

  @Field()
  likeCount: number

  @Field()
  saveCount: number

  @Field()
  replyCount: number

  @Field({ nullable: true })
  lastReplyAt?: Date

  @Field()
  rate: number
}
