import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductDto } from 'src/interfaces/product.interface';

import { ParseIntPipe } from 'src/pipes/parse-int/parse-int.pipe';

import { ProductsService } from 'src/services/products/products.service';

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
