import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

import { Brand } from './brand.entity';

@Schema()
export class Product extends Document {
  @Prop({ unique: true, required: true })
  sku: string;

  @Prop({ required: true })
  name: string;

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

  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;

  @Prop({ type: ObjectId, ref: Brand.name })
  brand: Brand | ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 });
