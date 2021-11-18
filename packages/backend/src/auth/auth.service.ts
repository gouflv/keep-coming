import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'
import { User } from 'src/user'
import { UserService } from 'src/user/user.service'
import { JwtPayload } from './types/jwt-payload'
import { LoginResponse } from './types/login.response'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jtw: JwtService) {}

  async validate(name: string, password: string): Promise<User> {
    const user = await this.userService.findFirst({ name })

    if (!user) {
      throw new HttpException(`User ${name} no found`, 401)
    }

    try {
      if (await argon.verify(user.password, password)) {
        return user
      } else {
        throw new HttpException(`Password error`, 401)
      }
    } catch (e) {
      throw new HttpException(`${e.message}`, 500)
    }
  }

  async login(name: string, password: string): Promise<LoginResponse> {
    try {
      const user = await this.validate(name, password)

      const payload: JwtPayload = {
        sub: user.id,
        name: user.name,
        admin: false,
      }

      return {
        user,
        access_token: this.jtw.sign(payload),
      }
    } catch (e) {
      throw e
    }
  }
}
