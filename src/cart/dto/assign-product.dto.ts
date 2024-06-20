import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AssignProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @ApiProperty()
  @IsString()
  cart_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
