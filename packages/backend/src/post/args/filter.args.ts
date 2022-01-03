import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class PostFilterArgs {
  @Field({ nullable: true })
  authorId?: string

  @Field({ nullable: true })
  nodeId?: string

  @Field({ nullable: true })
  categoryId?: string
}
