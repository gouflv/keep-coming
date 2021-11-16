import { registerEnumType } from '@nestjs/graphql'

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description: 'A list orderBy direction argument',
})
