import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssignProductDto } from './dto/assign-product.dto';
import { ProductsService } from 'src/products/products.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { ProductInCart } from 'prisma/prisma-client';
import { RemoveProductToCartDto } from './dto/remove-product-cart.dto';

interface updateAmountCartProps {
  productId: string;
  cartId: string;
  quantity: number;
}

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductsService,
  ) {}

  private async findCartById(id: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      select: {
        products: true,
      },
    });

    return cart;
  }

  private async getProductInCart(productId: string, cartId: string) {
    return await this.prisma.productInCart.findFirst({
      where: {
        product_id: productId,
        cart_id: cartId,
      },
    });
  }

  private async updateTotalAmountCart(cartId: string) {
    let totalUpdated: number = 0.0;

    const cart = await this.findCartById(cartId);
    //
    cart.products.forEach((product: ProductInCart) => {
      totalUpdated += product.total_amount;
    });

    // Actualizamos el monto total en el carrito de compras.
    return await this.prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        total_amount: totalUpdated,
      },
    });
  }

  private async updateProductQuantityAndPrice({
    productId,
    cartId,
    quantity,
  }: updateAmountCartProps) {
    const { data: product } = await this.productService.findOne(productId);

    await this.prisma.productInCart.updateMany({
      where: {
        cart_id: cartId,
        product_id: productId,
      },
      data: {
        quantity,
        total_amount: product.price * quantity,
      },
    });
  }

  private async createCartWithProduct(
    productId: string,
    total_quantity: number,
  ) {
    // obtenemos el producto.
    const { data: product } = await this.productService.findOne(productId);

    // creamos el carrito
    const { data: cart } = await this.create({
      total_amount: product.price * total_quantity,
    });

    // añadimos el producto al carrito de compras.
    await this.prisma.productInCart.create({
      data: {
        cart_id: cart.id,
        product_id: productId,
        quantity: total_quantity,
        total_amount: product.price * total_quantity,
      },
    });

    return cart;
  }

  async getCart(id: string) {
    const data = await this.findCartById(id);

    return {
      statusCode: 200,
      data,
    };
  }

  async create(createCartDto: CreateCartDto) {
    const data = await this.prisma.cart.create({
      data: createCartDto,
    });

    return {
      statusCode: 200,
      data,
    };
  }

  async assingProduct(assignProductDto: AssignProductDto) {
    const cartId = assignProductDto.cart_id;
    const productId = assignProductDto.product_id;
    let total_quantity = assignProductDto.quantity;
    let cart;

    const cartAvailable: boolean =
      (await this.getCart(cartId)).statusCode === 200;

    if (!cartAvailable) {
      return {
        statusCode: 400,
        error: 'bad request',
        message: 'Invalid shopping cart ID.',
      };
    }

    if (cartId && cartAvailable) {
      // Verificamos si el producto ya existe en el carrito de compras.
      const productInCart = await this.getProductInCart(productId, cartId);

      // Existe -> actualizamos la cantidad del producto en el carrito.
      if (productInCart) {
        total_quantity += productInCart.quantity;

        this.updateProductQuantityAndPrice({
          cartId,
          productId,
          quantity: total_quantity,
        });

        cart = this.updateTotalAmountCart(cartId);
      }
    }

    // si el carrito no existe, creamos un nuevo carrito de compras.
    if (!cartId) {
      cart = this.createCartWithProduct(productId, total_quantity);
    }

    return {
      statusCode: 201,
      data: cart,
    };
  }

  async removeProduct(removeProductDto: RemoveProductToCartDto) {
    const cartId = removeProductDto.cart_id;
    const total_quantity = removeProductDto.quantity;
    const productId = removeProductDto.product_id;

    const cartAvailable: boolean =
      (await this.getCart(cartId)).statusCode === 200;

    if (!cartAvailable) {
      return {
        statusCode: 400,
        error: 'bad request',
        message: 'Invalid shopping cart ID.',
      };
    }

    // Verificamos si el producto ya existe en el carrito de compras.
    const productInCart = await this.getProductInCart(productId, cartId);

    if (!productInCart) {
      return {
        statusCode: 400,
        error: 'Bad request',
        message: 'product_id not found in cart.',
      };
    }

    if (removeProductDto.all) {
      this.prisma.productInCart.deleteMany({
        where: {
          cart_id: cartId,
          product_id: productId,
        },
      });
    }

    if (total_quantity) {
      const quantity = productInCart.quantity - total_quantity;
      //
      this.updateProductQuantityAndPrice({ cartId, productId, quantity });
    }

    const cart = this.updateTotalAmountCart(cartId);

    return {
      statusCode: 201,
      data: cart,
    };
  }

  async deleteCart(id: string) {
    const cart = await this.prisma.cart.delete({
      where: {
        id,
      },
    });

    return {
      statusCode: 200,
      data: cart,
      message: `Success delete cart #${id}`,
    };
  }
}
