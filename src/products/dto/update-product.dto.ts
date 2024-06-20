import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @ApiProperty()
  @IsString()
  name: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  description: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  price: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  stock: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  category_id: string;
}
