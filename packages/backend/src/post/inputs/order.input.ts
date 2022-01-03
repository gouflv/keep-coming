import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { OrderDirection } from '../../utils/graphql'

export enum PostOrderType {
  RECENT = 'recent',
  RATE = 'rate'
}

registerEnumType(PostOrderType, {
  name: 'PostOrderField',
  valuesMap: {
    RATE: {
      description: "Order by post's rate"
    },
    RECENT: {
      description: "Order by post's last active time"
    }
  }
})

@InputType()
export class PostOrderInput {
  @Field(type => PostOrderType)
  type: PostOrderType

  @Field(type => OrderDirection, { nullable: true })
  direction: OrderDirection
}
