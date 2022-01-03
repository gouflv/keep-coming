import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

@ArgsType()
export class PaginatedArgs {
  @Field(type => Int, { nullable: true })
  @IsInt()
  @Min(0)
  skip = 0

  @Field(type => Int, { nullable: true })
  @IsInt()
  @Min(1)
  @Max(100)
  take = 50
}
