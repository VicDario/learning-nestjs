import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BrandsController } from './controllers/brands/brands.controller';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const API_KEY = 'HelloIAmASecret';
@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [
    AppController,
    BrandsController
  ],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: API_KEY
    }
  ],
})
export class AppModule {}
