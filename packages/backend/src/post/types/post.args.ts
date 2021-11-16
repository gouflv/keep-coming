import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql'
import { OrderDirection, PaginationArgs } from 'src/utils/graphql'

export enum PostOrderField {
  CREATE_AT = 'create_at',
  LAST_REPLY_AT = 'last_reply_at',
}

registerEnumType(PostOrderField, {
  name: 'PostOrderField',
})

@InputType()
class PostOrder {
  @Field(type => PostOrderField)
  field: PostOrderField

  @Field(type => OrderDirection, { nullable: true })
  direction: OrderDirection
}

@ArgsType()
export class PostsArgs extends PaginationArgs {
  @Field(type => PostOrder)
  order: PostOrder = {
    field: PostOrderField.CREATE_AT,
    direction: OrderDirection.DESC,
  }
}
