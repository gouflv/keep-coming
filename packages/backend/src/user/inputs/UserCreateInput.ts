import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Max, MaxLength, MinLength } from 'class-validator'
import { User } from '@kc/shared'

@InputType({ description: 'User register form data' })
export class UserCreateInput implements Partial<User> {
  @Field()
  @MinLength(4)
  @MaxLength(20)
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @MinLength(6)
  @MaxLength(16)
  password: string
}
