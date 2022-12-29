import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BrandsController } from './controllers/brands/brands.controller';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [
    AppController,
    BrandsController
  ],
  providers: [AppService],
})
export class AppModule {}
