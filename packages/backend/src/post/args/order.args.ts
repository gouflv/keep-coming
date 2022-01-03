import { ArgsType, Field } from '@nestjs/graphql'
import { OrderDirection } from '../../utils/graphql'
import { PostOrderInput, PostOrderType } from '../inputs/order.input'

@ArgsType()
export class PostOrderArgs {
  @Field(type => PostOrderInput, { nullable: true })
  order?: PostOrderInput = {
    type: PostOrderType.RATE,
    direction: OrderDirection.DESC
  }
}
