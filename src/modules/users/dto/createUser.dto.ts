import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUppercase,
} from 'class-validator'

import { IsAbstractEnum } from 'src/shared/decorators'
import { ROLE, STATUS } from '../enums'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsOptional()
  @IsString()
  readonly password: string

  @IsOptional()
  @IsString()
  readonly last_name: string

  @IsOptional()
  @IsString()
  @IsUppercase()
  @IsAbstractEnum(STATUS)
  readonly status: STATUS

  @IsOptional()
  @IsString()
  @IsUppercase()
  @IsAbstractEnum(ROLE)
  readonly role: ROLE
}
