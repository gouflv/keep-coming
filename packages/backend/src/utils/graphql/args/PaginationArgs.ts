import { ArgsType, Field, Int } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@ArgsType()
export class PaginatedArgs {
  @Field({ nullable: true })
  cursor?: string

  @Field(type => Int, { nullable: true })
  @Min(1)
  @Max(100)
  take = 50
}
