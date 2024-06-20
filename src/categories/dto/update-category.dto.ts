import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    example: 'Electronics',
    description: 'Name of category',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'PC, Laptop, Phone',
    description: 'Description of category',
  })
  @IsOptional()
  @IsString()
  description: string;
}
