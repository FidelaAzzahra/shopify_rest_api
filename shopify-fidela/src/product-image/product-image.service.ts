import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ProductImage, ProductImageDocument } from './product-image.schema';
import { Product, ProductDocument } from 'src/product/product.schema';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectModel(ProductImage.name)
    private readonly productImageModel: Model<ProductImageDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(
    createProductImageDto: CreateProductImageDto,
  ): Promise<ProductImage> {
    const createdProductImage = new this.productImageModel(
      createProductImageDto,
    );

    const productImage = await createdProductImage.save();

    await this.productModel.findByIdAndUpdate(
      createProductImageDto.product_id,
      { $push: { images: productImage._id } },
    );

    return productImage;
  }

  async findAll(productId: string): Promise<ProductImage[]> {
    return this.productImageModel.find({ product_id: productId }).exec();
  }

  async count(productId: string): Promise<number> {
    return this.productImageModel
      .countDocuments({ product_id: productId })
      .exec();
  }

  async findOne(productId: string, imageId: string): Promise<ProductImage> {
    const productImage = await this.productImageModel
      .findOne({ product_id: productId, id: imageId })
      .exec();
    if (!productImage) {
      throw new NotFoundException('Product Image not found');
    }
    return productImage;
  }

  async update(
    productId: string,
    imageId: string,
    updateProductImageDto: UpdateProductImageDto,
  ): Promise<ProductImage> {
    const existingImage = await this.productImageModel
      .findOne({ product_id: productId, id: imageId })
      .exec();
    if (!existingImage) {
      throw new NotFoundException('Product Image not found');
    }

    if (updateProductImageDto.src) {
      existingImage.src = updateProductImageDto.src;
    }

    Object.assign(existingImage, updateProductImageDto);
    return existingImage.save();
  }

  async remove(productId: string, imageId: string): Promise<ProductImage> {
    const deletedProductImage = await this.productImageModel
      .findOneAndDelete({ product_id: productId, _id: imageId })
      .exec();
    if (!deletedProductImage) {
      throw new NotFoundException('Product Image not found');
    }

    await this.productModel.findByIdAndUpdate(productId, {
      $pull: { images: imageId },
    });

    return deletedProductImage;
  }
}
