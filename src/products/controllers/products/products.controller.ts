import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ProductsService } from 'src/products/services/products/products.service';

import { ProductDto } from 'src/products/dtos/product.dto';

import { ParseIntPipe } from 'src/pipes/parse-int/parse-int.pipe';


@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.findAll();
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  createProduct(@Body() payload: ProductDto) {
    return this.productsService.create(payload);
  }
}
