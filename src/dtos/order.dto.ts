import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Product } from 'src/interfaces/product.entity';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly totalCost: number;

  @IsOptional()
  @IsString()
  readonly status?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
