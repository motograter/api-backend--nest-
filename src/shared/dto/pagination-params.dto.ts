import { Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

import { IsAbstractEnum } from '../decorators'

export class PaginationParamsDto {
  @IsOptional()
  @IsString()
  @IsAbstractEnum(Prisma.UserScalarFieldEnum)
  readonly orderBy: Prisma.UserScalarFieldEnum

  @IsOptional()
  @IsString()
  @IsAbstractEnum(Prisma.SortOrder)
  readonly direction: Prisma.SortOrder

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly take: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly skip: number

  @IsOptional()
  @IsString()
  readonly name: string
}
