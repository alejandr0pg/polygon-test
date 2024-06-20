import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';
import { prismaHelper } from 'src/shared/helpers/prisma-helper';
import { ApiResponseInterface } from 'src/shared/interfaces';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ApiResponseInterface> {
    try {
      const data = await this.prisma.product.create({
        data: createProductDto,
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
      const data: Product[] = await this.prisma.product.findMany();

      return {
        statusCode: 200,
        data,
      };
    } catch (e) {
      return prismaHelper.cathPrismaClient(e);
    }
  }

  async search(search: string): Promise<ApiResponseInterface> {
    try {
      const prismaQuery = {
        where: {
          OR: [
            {
              name: { contains: search },
            },
            {
              description: { contains: search },
            },
            {
              category_id: { equals: search },
            },
          ],
        },
      };

      const data: Product[] = await this.prisma.product.findMany(prismaQuery);

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
      const data: Product = await this.prisma.product.findFirst({
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
    updateProductDto: UpdateProductDto,
  ): Promise<ApiResponseInterface> {
    try {
      const product: Product = await this.prisma.product.update({
        data: updateProductDto,
        where: {
          id,
        },
      });

      return {
        statusCode: 200,
        data: product,
      };
    } catch (e) {
      return prismaHelper.cathPrismaClient(e);
    }
  }

  async remove(id: string): Promise<ApiResponseInterface> {
    try {
      const product = await this.prisma.product.delete({
        where: {
          id,
        },
      });

      return {
        statusCode: 200,
        data: product,
        message: `Success delete ${id}`,
      };
    } catch (e) {
      return prismaHelper.cathPrismaClient(e);
    }
  }
}
