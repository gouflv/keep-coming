import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PostExtendInfo {
  @Field()
  viewCount: number

  @Field()
  likeCount: number

  @Field()
  saveCount: number

  @Field()
  commentCount: number

  @Field({ nullable: true })
  lastCommentAt?: Date

  @Field()
  rate: number
}
