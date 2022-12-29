import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from 'src/products/entities/product.entity';
import { ProductDto } from 'src/products/dtos/product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'product',
      description: 'Great',
      price: 122,
    },
  ];
  private counter = 1;

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  create(payload: ProductDto) {
    this.counter++;
    this.products.push({
      ...payload,
      id: this.counter,
    });
    return this.findOne(this.counter);
  }
}
