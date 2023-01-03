import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ unique: true, required: true })
  sku: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: Number,
    required: true,
    validators: [
      {
        validator: Number.isInteger,
        message: 'Stock only can be an integer value',
      },
      {
        validator: (value: number) => {
          value >= 0;
        },
        message: 'Stock cannot be lower than 0',
      },
    ],
  })
  stock: number;

  @Prop({ type: Number, required: true, index: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 });
