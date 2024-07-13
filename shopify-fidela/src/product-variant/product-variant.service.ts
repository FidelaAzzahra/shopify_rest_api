import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import {
  ProductVariant,
  ProductVariantDocument,
} from './product-variant.schema';
import { Product, ProductDocument } from 'src/product/product.schema';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectModel(ProductVariant.name)
    private readonly productVariantModel: Model<ProductVariantDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(
    createProductVariantDto: CreateProductVariantDto,
  ): Promise<ProductVariant> {
    const createdProductVariant = new this.productVariantModel(
      createProductVariantDto,
    );
    const productVariant = await createdProductVariant.save();

    await this.productModel.findByIdAndUpdate(
      createProductVariantDto.product_id,
      { $push: { variants: productVariant._id } },
    );

    return productVariant;
  }

  async findAll(productId: string): Promise<ProductVariant[]> {
    return this.productVariantModel.find({ product_id: productId }).exec();
  }

  async count(productId: string): Promise<number> {
    return this.productVariantModel
      .countDocuments({ product_id: productId })
      .exec();
  }

  async findOne(id: string): Promise<ProductVariant> {
    const productVariant = await this.productVariantModel.findById(id).exec();
    if (!productVariant) {
      throw new NotFoundException('Product Variant not found');
    }
    return productVariant;
  }

  async update(
    id: string,
    updateProductVariantDto: UpdateProductVariantDto,
  ): Promise<ProductVariant> {
    const updatedProductVariant = await this.productVariantModel
      .findByIdAndUpdate(id, updateProductVariantDto, { new: true })
      .exec();
    if (!updatedProductVariant) {
      throw new NotFoundException('Product Variant not found');
    }
    return updatedProductVariant;
  }

  async remove(productId: string, variantId: string): Promise<ProductVariant> {
    const deletedProductVariant = await this.productVariantModel
      .findByIdAndDelete(variantId)
      .exec();
    if (!deletedProductVariant) {
      throw new NotFoundException('Product Variant not found');
    }

    await this.productModel.findByIdAndUpdate(productId, {
      $pull: { variants: variantId },
    });

    return deletedProductVariant;
  }
}
