import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { BrandsController } from './controllers/brands/brands.controller';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { firstValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 1000,
        maxRedirects: 5,
      }),
    }),
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController, BrandsController],
  providers: [
    AppService,

    {
      provide: 'TASKS',
      inject: [HttpService],
      useFactory: async (http: HttpService) => {
        // Calling an API only for educational purpose
        const tasks = http.get('https://jsonplaceholder.typicode.com/todos', {
          headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
        });
        const data = await firstValueFrom(tasks);
        return data.data;
      },
    },
  ],
})
export class AppModule {}
