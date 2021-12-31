import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class PostFindManyFilter {
  @Field({ nullable: true })
  authorId?: string

  @Field({ nullable: true })
  nodeId?: string
}
