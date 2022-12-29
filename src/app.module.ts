import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandsController } from './controllers/brands/brands.controller';
import { UsersController } from './controllers/users/users.controller';
import { CostumersController } from './controllers/costumers/costumers.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [ProductsModule],
  controllers: [
    AppController,
    BrandsController,
    UsersController,
    CostumersController,
    OrdersController,
  ],
  providers: [AppService],
})
export class AppModule {}
