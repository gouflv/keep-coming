import { Args, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(returns => String)
  async login(@Args('name') name: string, @Args('password') password: string) {
    return this.authService.login(name, password)
  }
}
