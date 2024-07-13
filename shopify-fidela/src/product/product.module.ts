import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductImageModule } from '../product-image/product-image.module';
import { ProductVariantModule } from '../product-variant/product-variant.module';
import { Product, ProductSchema } from './product.schema';
import {
  ProductVariant,
  ProductVariantSchema,
} from 'src/product-variant/product-variant.schema';
import {
  ProductImage,
  ProductImageSchema,
} from 'src/product-image/product-image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductVariant.name, schema: ProductVariantSchema },
      { name: ProductImage.name, schema: ProductImageSchema },
    ]),

    ProductImageModule,
    ProductVariantModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
