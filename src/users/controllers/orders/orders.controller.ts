import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from 'src/users/services/orders/orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  addProductsToOrderDto,
} from 'src/users/dtos/order.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
    return this.ordersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Delete(':orderId/product/:productId')
  async removeProduct(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return await this.ordersService.removeProduct(orderId, productId);
  }

  @Put(':orderId/products')
  async addProducts(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Body() payload: addProductsToOrderDto,
  ) {
    return await this.ordersService.addProducts(orderId, payload.productsId);
  }
}
