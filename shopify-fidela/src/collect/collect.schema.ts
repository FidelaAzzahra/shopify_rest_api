// src/collect/schemas/collect.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CustomCollection } from 'src/custom-collection/custom-collection.schema';
import { Product } from 'src/product/product.schema';

@Schema()
export class Collect {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'CustomCollection',
  })
  collection_id: CustomCollection;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Product' })
  product_id: Product;

  @Prop()
  position: number;

  @Prop()
  sort_value: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export type CollectDocument = Collect & Document;
export const CollectSchema = SchemaFactory.createForClass(Collect);
