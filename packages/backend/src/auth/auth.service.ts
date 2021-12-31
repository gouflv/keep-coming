import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'
import { UserService } from '../user/user.service'
import { JwtPayload } from './types/jwt-payload'
import { LoginResponse } from './types/login.response'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jtw: JwtService) {}

  /**
   * Return the user if found matched, or throw an exception.
   */
  async validateLocalUser(name: string, password: string) {
    const user = await this.userService.findFirst({ name })

    if (!user) {
      throw new UnauthorizedException()
    }

    if (await argon.verify(user.password, password)) {
      return user
    } else {
      throw new UnauthorizedException()
    }
  }

  async login(name: string, password: string): Promise<LoginResponse> {
    try {
      const user = await this.validateLocalUser(name, password)

      const payload: JwtPayload = {
        sub: user.id,
        name: user.name
      }

      return {
        access_token: this.jtw.sign(payload)
      }
    } catch (e) {
      throw e
    }
  }
}
