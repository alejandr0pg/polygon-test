import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const data = await this.prisma.category.create({
      data: createCategoryDto,
    });

    return {
      statusCode: 201,
      data,
    };
  }

  async findAll() {
    const data = await this.prisma.category.findMany();

    return {
      statusCode: 200,
      data,
    };
  }

  async findOne(id: string) {
    const data = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    return {
      statusCode: 200,
      data,
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const data = await this.prisma.category.update({
      data: updateCategoryDto,
      where: {
        id,
      },
    });

    return {
      statusCode: 200,
      data,
    };
  }

  async remove(id: string) {
    const data = await this.prisma.category.delete({
      where: {
        id,
      },
    });

    return {
      statusCode: 200,
      data,
      message: `Success delete ${id}`,
    };
  }
}
