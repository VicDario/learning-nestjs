import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpModule, HttpService } from '@nestjs/axios';

import { BrandsController } from './controllers/brands/brands.controller';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { firstValueFrom } from 'rxjs';

const API_KEY = 'HelloIAmASecret';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 1000,
        maxRedirects: 5,
      }),
    }),
    ProductsModule,
    UsersModule
  ],
  controllers: [AppController, BrandsController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
    {
      provide: 'TASKS',
      inject: [HttpService],
      useFactory: async (http: HttpService) => {
        const tasks = http.get('https://jsonplaceholder.typicode.com/todos', { // Calling an API only for educational purpose
          headers: { 'Accept-Encoding': 'gzip,deflate,compress' }
        });
        const data = await firstValueFrom(tasks);
        return data.data
      },
    }
  ],
})
export class AppModule {}
