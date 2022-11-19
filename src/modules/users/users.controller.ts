import { Prisma, User } from '@prisma/client'
import {
  ArgumentMetadata,
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  PipeTransform,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { User as UserModel } from '@prisma/client'
import { CreateUserDto, UpdateUserDto } from './dto'
import { PaginationParamsDto } from 'src/shared/dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto)
  }

  @Get()
  async selectAllUsers(@Query() query: PaginationParamsDto) {
    const { orderBy, take, direction, skip } = query
    return await this.userService.selectAllUsers({
      take,
      skip,
      orderBy: {
        [orderBy as string]: direction,
      },
    })
  }

  @Get(':id')
  async selectOne(@Param() params: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.userService.selectOne({
      id: params.id,
    })
  }

  @Patch(':id')
  async updateOne(
    @Param() { id }: { id: string },
    @Body() data: UpdateUserDto
  ): Promise<User> {
    return await this.userService.updateUser({ where: { id: id }, data })
  }

  @Delete(':id')
  async deleteOne(@Param() { id }: { id: string }) {
    return await this.userService.deleteOne(id)
  }
}
