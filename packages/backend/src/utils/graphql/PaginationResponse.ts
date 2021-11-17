import { Type } from '@nestjs/common'
import { Field, ObjectType } from '@nestjs/graphql'

export function PaginatedResponse<TItem>(ItemType: Type<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(type => [ItemType])
    items: TItem[]

    @Field()
    total: number
  }
  return PaginatedResponseClass
}
