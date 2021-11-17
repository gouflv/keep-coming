import { HttpException, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import * as argon from 'argon2'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(name: string, password: string): Promise<string> {
    const user = await this.userService.findFirst({
      name,
    })
    if (!user) {
      throw new HttpException(`User ${name} no found`, 401)
    }

    try {
      if (await argon.verify(user.password, password)) {
        return user.name
      } else {
        throw new HttpException(`Password error`, 401)
      }
    } catch (e) {
      throw new HttpException(`${e.message}`, 500)
    }
  }
}
