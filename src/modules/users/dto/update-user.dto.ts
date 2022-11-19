import { User } from '@prisma/client'
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUppercase,
} from 'class-validator'

enum Status {
  DEACTIVATED = 'DEACTIVATED',
  ACTIVATED = 'ACTIVATED',
  PENDING = 'PENDING',
}

export class UpdateUserDto implements Partial<User> {
  email: string
  password: string
  name: string
  last_name: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Status)
  @IsUppercase()
  status: Status

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsUppercase()
  role: string
}
