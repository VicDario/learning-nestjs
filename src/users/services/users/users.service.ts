import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductsService } from 'src/products/services/products/products.service';

import { Order } from 'src/users/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';

@Injectable()
export class UsersService {
  private counter = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'email@email.com',
      password: '12345',
      role: 'admin'
    }
  ]
  constructor(private productsService: ProductsService) {}

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) throw new NotFoundException('Product not found');
    return user;
  }

  create(payload: CreateUserDto) {
    this.counter++;
    this.users.push({
      ...payload,
      id: this.counter,
    });
    return this.findOne(this.counter);
  }
  update(id: number, changes: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getOrderByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
