import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
