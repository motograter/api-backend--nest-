import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, User } from '@prisma/client'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user
      .create({
        data: user,
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === 'P2002') {
            throw new HttpException(
              {
                message:
                  'There is a unique constraint violation, a new user cannot be created with this email',
              },
              HttpStatus.CONFLICT
            )
          }
        }
        return err
      })
  }

  async selectAllUsers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async selectOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })
    if (!user) {
      throw new NotFoundException({
        error: {
          message: 'User Not Found',
          status: HttpStatus.NOT_FOUND,
        },
      })
    }
    return user
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }) {
    const { where, data } = params
    return await this.prisma.user
      .update({
        where,
        data,
      })
      .catch((error) => {
        throw new BadRequestException(
          new HttpErrorByCode[HttpStatus.BAD_REQUEST]()
        )
      })
  }

  async deleteOne(userId: string) {
    return await this.prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }
}
