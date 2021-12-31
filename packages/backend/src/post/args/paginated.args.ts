import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql'
import { OrderDirection, PaginatedArgs } from '../../utils/graphql'

export enum PostOrderType {
  CREATE_AT = 'createAt',
  LAST_COMMENT_AT = 'lastCommentAt'
}

registerEnumType(PostOrderType, {
  name: 'PostOrderField'
})

@InputType()
class PostOrder {
  @Field(type => PostOrderType)
  type: PostOrderType

  @Field(type => OrderDirection, { nullable: true })
  direction: OrderDirection
}

@ArgsType()
export class PostPaginatedArgs extends PaginatedArgs {
  @Field(type => PostOrder)
  order: PostOrder = {
    type: PostOrderType.CREATE_AT,
    direction: OrderDirection.DESC
  }
}
