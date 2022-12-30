import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';
import { ProductDto, UpdateProductDto } from 'src/products/dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(payload: ProductDto) {
    const newProduct = new this.productModel(payload);
    return await newProduct.save();
  }

  async update(id: string, changes: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    return product;
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id).exec();
  }
}
