import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ProductVariant } from 'src/product-variant/product-variant.schema';
import { Product } from 'src/product/product.schema';

@Schema()
export class ProductImage {
  @Prop() created_at: Date;
  @Prop() position: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product_id: Product;
  @Prop([mongoose.Schema.Types.ObjectId]) variant_ids: ProductVariant[];
  @Prop() src: string;
  @Prop() width: number;
  @Prop() height: number;
  @Prop() updated_at: Date;
}

export type ProductImageDocument = ProductImage & Document;
export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);
