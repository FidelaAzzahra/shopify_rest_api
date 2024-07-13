import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductStatus, PublishedScope } from 'src/types/enums';

@Schema()
export class Product {
  @Prop({ type: String })
  body_html: string;

  @Prop({ type: String })
  created_at: string;

  @Prop({ type: String })
  handle: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductImage' }] })
  images: Types.ObjectId[];

  @Prop({ type: Object })
  options: Record<string, any>;

  @Prop({ type: String })
  product_type: string;

  @Prop({ type: String })
  published_at: string;

  @Prop({ type: String, enum: PublishedScope })
  published_scope: PublishedScope; // web , global

  @Prop({ type: String, enum: ProductStatus })
  status: ProductStatus; // active, archived, draft

  @Prop({ type: String })
  tags: string;

  @Prop({ type: String })
  template_suffix: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  updated_at: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductVariant' }] })
  variants: Types.ObjectId[];

  @Prop({ type: String })
  vendor: string;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
