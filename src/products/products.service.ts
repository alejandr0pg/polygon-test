import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const data = await this.prisma.product.create({
      data: createProductDto,
    });

    return {
      statusCode: 201,
      data,
    };
  }

  async findAll() {
    const data: Product[] = await this.prisma.product.findMany();

    return {
      statusCode: 200,
      data,
    };
  }

  async search(search: string) {
    const prismaQuery = {
      where: {
        OR: [
          {
            name: { contains: search },
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
  }

  async findOne(id: string) {
    const data: Product = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    return {
      statusCode: 200,
      data,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
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
  }

  async remove(id: string) {
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
  }
}
