import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ProductImage,
  ProductImageDocument,
} from 'src/product-image/product-image.schema';
import {
  ProductVariant,
  ProductVariantDocument,
} from 'src/product-variant/product-variant.schema';
import { faker } from '@faker-js/faker';
import {
  InventoryManagement,
  InventoryPolicy,
  ProductStatus,
  PublishedScope,
} from 'src/types/enums';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(ProductImage.name)
    private readonly productImageModel: Model<ProductImageDocument>,
    @InjectModel(ProductVariant.name)
    private readonly productVariantModel: Model<ProductVariantDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(ids?: string): Promise<Product[]> {
    if (ids) {
      const idsArray = ids.split(',').map((id) => Number(id));
      return this.productModel
        .find({ id: { $in: idsArray } })
        .populate('images')
        .populate('variants')
        .exec();
    }
    return this.productModel
      .find()
      .populate('images')
      .populate('variants')
      .exec();
  }

  async count(): Promise<number> {
    return this.productModel.countDocuments().exec();
  }

  async findOne(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productModel.findById(productId).exec();
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(existingProduct, updateProductDto);
    return existingProduct.save();
  }

  async remove(productId: string): Promise<Product> {
    const deletedProduct = await this.productModel
      .findByIdAndDelete(productId)
      .exec();
    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }
    return deletedProduct;
  }

  async seed(count: number): Promise<string> {
    try {
      for (let i = 0; i < count; i++) {
        // Create a new product
        const newProduct = new this.productModel({
          body_html: faker.lorem.paragraph(),
          created_at: faker.date.past().toISOString(),
          handle: faker.lorem.slug(),
          options: { option1: faker.commerce.productMaterial() },
          product_type: faker.commerce.department(),
          published_at: faker.date.past().toISOString(),
          published_scope: faker.helpers.arrayElement(
            Object.values(PublishedScope),
          ),
          status: faker.helpers.arrayElement(Object.values(ProductStatus)),
          tags: faker.lorem.words(),
          template_suffix: faker.lorem.word(),
          title: faker.commerce.productName(),
          updated_at: faker.date.recent().toISOString(),
          vendor: faker.company.name(),
        });

        // Save the product to get its ID
        const savedProduct = await newProduct.save();

        // Create an array to hold variant IDs
        const productVariants = [];

        // Create 2 product variants for each product
        for (let k = 0; k < 2; k++) {
          const newProductVariant = new this.productVariantModel({
            barcode: faker.string.alphanumeric(10),
            compare_at_price: faker.commerce.price(),
            created_at: faker.date.past(),
            fulfillment_service: faker.company.name(),
            grams: faker.number.int(),
            inventory_item_id: faker.number.int(),
            inventory_management: faker.helpers.arrayElement(
              Object.values(InventoryManagement),
            ),
            inventory_policy: faker.helpers.arrayElement(
              Object.values(InventoryPolicy),
            ),
            inventory_quantity: faker.number.int({ min: 0, max: 100 }),
            old_inventory_quantity: faker.number.int({ min: 0, max: 100 }),
            option: { option1: faker.color.human() },
            presentment_prices: {
              presentment_prices: [
                {
                  price: {
                    currency_code: 'USD',
                    amount: faker.commerce.price(),
                  },
                  compare_at_price: {
                    currency_code: 'USD',
                    amount: faker.commerce.price(),
                  },
                },
              ],
            },
            position: k + 1,
            price: faker.commerce.price(),
            product_id: savedProduct._id,
            requires_shipping: true,
            sku: faker.string.alphanumeric(10),
            taxable: true,
            tax_code: faker.string.alphanumeric(10),
            title: faker.commerce.productName(),
            updated_at: faker.date.recent(),
            weight: faker.number.int(),
            weight_unit: 'g',
          });

          const savedVariant = await newProductVariant.save();
          productVariants.push(savedVariant._id);
        }

        // Create 2 product images for each product and link them with variants
        const productImages = [];
        for (let j = 0; j < 2; j++) {
          const newProductImage = new this.productImageModel({
            created_at: faker.date.past(),
            position: j + 1,
            product_id: savedProduct._id,
            src: faker.image.urlPlaceholder(),
            width: faker.number.int({ min: 640, max: 1280 }),
            height: faker.number.int({ min: 480, max: 720 }),
            updated_at: faker.date.recent(),
            variant_ids: productVariants,
          });

          const savedImage = await newProductImage.save();
          productImages.push(savedImage._id);

          // Update each variant to link to this image
          await this.productVariantModel.updateMany(
            { _id: { $in: productVariants } },
            { $set: { image_id: savedImage._id } },
          );
        }

        // Update the product with images and variants
        await this.productModel.findByIdAndUpdate(savedProduct._id, {
          images: productImages,
          variants: productVariants,
        });
      }
      return `Generate ${count} products successfully`;
    } catch (error) {
      console.error('Error generating the products : ', error);
      throw new Error('Failed to reset the database.');
    }
  }

  async reset(): Promise<string> {
    try {
      await this.productModel.deleteMany();
      await this.productVariantModel.deleteMany();
      await this.productImageModel.deleteMany();
      return 'Reset products successfully';
    } catch (error) {
      console.error('Error resetting the products : ', error);
      throw new Error('Failed to reset the database.');
    }
  }
}
