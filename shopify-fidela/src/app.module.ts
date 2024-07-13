import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductVariantModule } from './product-variant/product-variant.module';
import { ProductModule } from './product/product.module';
import { CustomCollectionModule } from './custom-collection/custom-collection.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CollectModule } from './collect/collect.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://shopify:secret@mongodb:27017/admin'),
    // MongooseModule.forRoot('mongodb://shopify:secret@mongodb:27017/shopify-db'),
    // MongooseModule.forRoot('mongodb://localhost:27017/shopify-rest-api'),
    MulterModule.register({
      storage: diskStorage({
        destination: 'uploads/files',
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
    AdminModule,
    AuthModule,
    ProductVariantModule,
    ProductImageModule,
    ProductModule,
    CustomCollectionModule,
    CollectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
