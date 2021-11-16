import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import * as argon from 'argon2'
import { PrismaService } from 'src/core/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where })
  }

  async findFirst(where: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where,
      rejectOnNotFound: false,
    })
  }

  async create(input: Prisma.UserCreateInput): Promise<User> {
    const hasSameName = !!(await this.findFirst({
      name: { equals: input.name },
    }))
    if (hasSameName) {
      throw new HttpException(`Username ${input.name} is duplicated`, 400)
    }

    const hasSameEmail = !!(await this.findFirst({
      email: { equals: input.email },
    }))
    if (hasSameEmail) {
      throw new HttpException(`Email ${input.email} is duplicated`, 400)
    }

    input.password = await argon.hash(input.password)

    return this.prisma.user.create({ data: input })
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUncheckedUpdateInput
  }): Promise<User> {
    return this.prisma.user.update(params)
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where })
  }

  async auth(name: string, password: string): Promise<string> {
    const user = await this.findFirst({
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
