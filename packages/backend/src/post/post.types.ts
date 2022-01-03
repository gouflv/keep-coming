import { PaginatedArgs } from '../utils/graphql'
import { PostFilterArgs } from './args/filter.args'
import { PostOrderInput } from './inputs/order.input'

export type FindManyPostParams = {
  filter?: PostFilterArgs
  order?: PostOrderInput
  paginated?: PaginatedArgs
}
