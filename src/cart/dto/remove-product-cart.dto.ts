import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RemoveProductToCartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cart_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  all: boolean;
}
