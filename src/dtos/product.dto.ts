import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsPositive,
  IsArray,
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

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
