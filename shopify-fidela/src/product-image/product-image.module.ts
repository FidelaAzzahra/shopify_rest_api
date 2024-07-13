import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductImageController } from './product-image.controller';
import { ProductImage, ProductImageSchema } from './product-image.schema';
import { ProductImageService } from './product-image.service';
import { Product, ProductSchema } from 'src/product/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductImage.name, schema: ProductImageSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: 'uploads/product-images',
        filename: (req, file, cb) => {
          try {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const filePath = `${uniqueSuffix}-${file.originalname}`;
            cb(null, filePath);
          } catch (error) {
            console.error('Error saving uploaded file:', error);
            cb(error, null); // Pass error to Multer
          }
        },
      }),
    }),
  ],
  controllers: [ProductImageController],
  providers: [ProductImageService],
})
export class ProductImageModule {}
