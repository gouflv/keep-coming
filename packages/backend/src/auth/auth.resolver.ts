import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { User } from '@kc/shared'
import { UserService } from 'src/user/user.service'
import { GqlAuthGuard, GqlAuthPayload, JwtPayload } from '.'
import { AuthService } from './auth.service'
import { LoginResponse } from './types/login.response'

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Query(returns => LoginResponse)
  async login(@Args('name') name: string, @Args('password') password: string) {
    return this.authService.login(name, password)
  }

  @Query(returns => User, { description: 'Look up a user that has logged in' })
  @UseGuards(GqlAuthGuard)
  async currentUser(@GqlAuthPayload() payload: JwtPayload) {
    return this.userService.findOne({ id: payload.sub })
  }
}
