import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ required: false, default: 0 })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  total_amount: number = 0;
}
