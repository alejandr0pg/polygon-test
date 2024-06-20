import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponseInterface } from 'src/shared/interfaces';
import { prismaHelper } from 'src/shared/helpers/prisma-helper';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponseInterface> {
    try {
      const data = await this.prisma.category.create({
        data: createCategoryDto,
      });

      return {
        statusCode: 201,
        data,
      };
    } catch (e) {
      return prismaHelper.cathPrismaClient(e);
    }
  }

  async findAll(): Promise<ApiResponseInterface> {
    try {
      const data = await this.prisma.category.findMany();

      return {
        statusCode: 200,
        data,
      };
    } catch (e) {
      return prismaHelper.cathPrismaClient(e);
    }
  }

  async findOne(id: string): Promise<ApiResponseInterface> {
    try {
      const data = await this.prisma.product.findFirst({
        where: {
          id,
        },
      });

      return {
        statusCode: 200,
        data,
      };
    } catch (e) {
      return prismaHelper.cathPrismaClient(e);
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ApiResponseInterface> {
    try {
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
    } catch (e) {
      return prismaHelper.cathPrismaClient(e);
    }
  }

  async remove(id: string): Promise<ApiResponseInterface> {
    try {
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
    } catch (e) {
      return prismaHelper.cathPrismaClient(e);
    }
  }
}
