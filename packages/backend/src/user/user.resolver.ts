import { ParseIntPipe } from '@nestjs/common'
import { Query, Args, Resolver } from '@nestjs/graphql'
import { User } from './user.model'
import { UserService } from './user.service'

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => User)
  async user(@Args('id', ParseIntPipe) id: number) {
    return this.userService.findOne({ id })
  }
}
