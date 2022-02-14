import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsPositive,
  IsDate,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product name', example: 'Mesa' })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Product description',
    example: 'Mesa de trabajo',
  })
  readonly description?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Product price', example: 999 })
  readonly price: number;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'Url of image',
    example: 'http://www.example.com',
  })
  readonly image?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Product stock', example: 10 })
  readonly stock: number;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'This variable is setted automatically, show created date',
    default: new Date(),
  })
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'This variable is setted automatically, show updated date',
    default: new Date(),
  })
  readonly updatedAt?: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly categoryId: number;

  @IsOptional()
  @IsNumber()
  readonly orderId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
