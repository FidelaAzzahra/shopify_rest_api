import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomCollectionService } from './custom-collection.service';
import { CustomCollectionController } from './custom-collection.controller';
import {
  CustomCollection,
  CustomCollectionSchema,
} from './custom-collection.schema';
import { Product, ProductSchema } from 'src/product/product.schema';
import { Collect, CollectSchema } from 'src/collect/collect.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomCollection.name, schema: CustomCollectionSchema },
      { name: Collect.name, schema: CollectSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [CustomCollectionController],
  providers: [CustomCollectionService],
})
export class CustomCollectionModule {}
