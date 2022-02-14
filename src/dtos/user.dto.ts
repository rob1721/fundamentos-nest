import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;
}

export class UpdateProductDto extends PartialType(CreateUserDto) {}
