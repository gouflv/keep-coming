import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PostExtend {
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
