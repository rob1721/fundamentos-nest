import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly status?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Customer id', example: 1 })
  readonly customerId: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  readonly productsIds: number[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
