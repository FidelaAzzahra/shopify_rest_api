import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ProductImage } from 'src/product-image/product-image.schema';
import { Product } from 'src/product/product.schema';
import { InventoryManagement, InventoryPolicy } from 'src/types/enums';

@Schema()
export class ProductVariant {
  @Prop()
  barcode: string;

  @Prop()
  compare_at_price: string;

  @Prop()
  created_at: Date;

  @Prop()
  fulfillment_service: string;

  @Prop()
  grams: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductImage' })
  image_id: ProductImage;

  @Prop()
  inventory_item_id: number;

  @Prop({ type: String, enum: InventoryManagement })
  inventory_management: InventoryManagement;

  @Prop({ type: String, enum: InventoryPolicy })
  inventory_policy: InventoryPolicy;

  @Prop()
  inventory_quantity: number;

  @Prop()
  old_inventory_quantity: number;

  @Prop({ type: Object })
  option: {
    option1: string;
  };

  @Prop({ type: Object })
  presentment_prices: {
    presentment_prices: [
      {
        price: {
          currency_code: string;
          amount: string;
        };
        compare_at_price: {
          currency_code: string;
          amount: string;
        };
      },
    ];
  };

  @Prop()
  position: number;

  @Prop()
  price: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  product_id: Product;

  @Prop()
  requires_shipping: boolean;

  @Prop()
  sku: string;

  @Prop()
  taxable: boolean;

  @Prop()
  tax_code: string;

  @Prop()
  title: string;

  @Prop()
  updated_at: Date;

  @Prop()
  weight: number;

  @Prop()
  weight_unit: string;
}

export type ProductVariantDocument = ProductVariant & Document;
export const ProductVariantSchema =
  SchemaFactory.createForClass(ProductVariant);
