import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../../user'

@ObjectType()
export class LoginResponse {
  @Field()
  user: User

  @Field()
  access_token: string
}
