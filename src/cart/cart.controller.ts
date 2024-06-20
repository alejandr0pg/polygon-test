import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AssignProductDto } from './dto/assign-product.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RemoveProductToCartDto } from './dto/remove-product-cart.dto';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get cart' })
  getCart(@Param('id') id: string) {
    return this.cartService.getCart(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create cart' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Post('assing')
  @ApiOperation({ summary: 'Assing product to cart' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully assinged to cart.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid shopping cart ID',
  })
  assing(@Body() assignProductDto: AssignProductDto) {
    return this.cartService.assingProduct(assignProductDto);
  }

  @Delete()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully remove to cart.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid shopping cart ID',
  })
  @ApiOperation({ summary: 'Remove product of cart' })
  remove(@Body() removeToCartDto: RemoveProductToCartDto) {
    return this.cartService.removeProduct(removeToCartDto);
  }

  @Delete(':cartId')
  @ApiOperation({ summary: 'Delete cart' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  deleteCart(@Param('id') id: string) {
    return this.cartService.deleteCart(id);
  }
}
