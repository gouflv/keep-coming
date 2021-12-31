//
// Dynamic ObjectType will make typing lose
// @see https://github.com/MichalLytek/type-graphql/blob/master/examples/generic-types/paginated-response.type.ts

// export function PaginatedResponse<TItem>(ItemType: Type<TItem>) {
//   @ObjectType({ isAbstract: true })
//   abstract class PaginatedResponseClass {
//     @Field(type => [ItemType])
//     items: TItem[]
//     @Field()
//     total: number
//   }
//   return PaginatedResponseClass
// }

export interface IPaginatedResponse<T> {
  items: T[]
  total: number
}
