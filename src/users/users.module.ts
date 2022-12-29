import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { CustomersController } from './controllers/customers/customers.controller';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, OrdersController, CustomersController],
  providers: [UsersService],
})
export class UsersModule {}
