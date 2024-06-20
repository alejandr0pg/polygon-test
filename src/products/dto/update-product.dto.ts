import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  price: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  stock_count: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  category_id: string;
}
