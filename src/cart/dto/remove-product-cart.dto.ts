import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RemoveProductToCartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cart_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  quantity?: number = 1;

  @ApiProperty({ required: false, default: false })
  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  all?: boolean = false;
}
