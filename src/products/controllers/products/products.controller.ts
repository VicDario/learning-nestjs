import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ProductsService } from 'src/products/services/products/products.service';

import {
  ProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/products/dtos/product.dto';

// import { ParseIntPipe } from 'src/pipes/parse-int/parse-int.pipe';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() query: FilterProductsDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  getProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  createProduct(@Body() payload: ProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  updateProduct(
    @Param('id', MongoIdPipe) id: string,
    @Body() changes: UpdateProductDto,
  ) {
    return this.productsService.update(id, changes);
  }

  @Delete()
  deleteProduct(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
