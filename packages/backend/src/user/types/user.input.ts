import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Max, MaxLength, MinLength } from 'class-validator'
import { User } from './user.model'

@InputType({ description: 'User register form data' })
export class AddUserInput implements Partial<User> {
  @Field()
  @MinLength(3)
  @MaxLength(8)
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @MinLength(6)
  @MaxLength(20)
  password: string
}
