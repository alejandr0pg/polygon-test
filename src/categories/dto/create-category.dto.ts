import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Name of category',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'PC, Laptop, Phone',
    description: 'Description of category',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
