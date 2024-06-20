import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Name of category',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'PC, Laptop, Phone',
    description: 'Description of category',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;
}
