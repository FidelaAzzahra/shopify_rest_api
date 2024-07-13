import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomCollectionDto } from './dto/create-custom-collection.dto';
import { UpdateCustomCollectionDto } from './dto/update-custom-collection.dto';
import {
  CustomCollection,
  CustomCollectionDocument,
} from './custom-collection.schema';
import { Collect, CollectDocument } from 'src/collect/collect.schema';
import { Product, ProductDocument } from 'src/product/product.schema';
import { faker } from '@faker-js/faker';
import { PublishedScope, SortOrder } from 'src/types/enums';

@Injectable()
export class CustomCollectionService {
  constructor(
    @InjectModel(CustomCollection.name)
    private customCollectionModel: Model<CustomCollectionDocument>,
    @InjectModel(Collect.name) private collectModel: Model<CollectDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(
    createCustomCollectionDto: CreateCustomCollectionDto,
  ): Promise<CustomCollection> {
    const createdCollection = new this.customCollectionModel(
      createCustomCollectionDto,
    );
    return createdCollection.save();
  }

  async findAll(): Promise<CustomCollection[]> {
    return this.customCollectionModel.find().exec();
  }

  async findOne(id: string): Promise<CustomCollection> {
    const collection = await this.customCollectionModel.findById(id).exec();
    if (!collection) {
      throw new NotFoundException(`CustomCollection with id ${id} not found`);
    }
    return collection;
  }

  async count(): Promise<number> {
    return this.customCollectionModel.countDocuments().exec();
  }

  async update(
    id: string,
    updateCustomCollectionDto: UpdateCustomCollectionDto,
  ): Promise<CustomCollection> {
    const updatedCollection = await this.customCollectionModel
      .findByIdAndUpdate(id, updateCustomCollectionDto, { new: true })
      .exec();
    if (!updatedCollection) {
      throw new NotFoundException(`CustomCollection with id ${id} not found`);
    }
    return updatedCollection;
  }

  async remove(id: string): Promise<CustomCollection> {
    const deletedCollection = await this.customCollectionModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCollection) {
      throw new NotFoundException(`CustomCollection with id ${id} not found`);
    }
    return deletedCollection;
  }

  async seed(
    collectionCount: number,
    collectsPerCollection: number,
  ): Promise<string> {
    try {
      // Fetch all Product IDs
      const productIds = (await this.productModel.find({}, '_id')).map(
        (product) => product._id,
      );
      const shuffledProductIds = this.shuffleArray([...productIds]);

      for (let i = 0; i < collectionCount; i++) {
        const newCustomCollection = new this.customCollectionModel({
          body_html: faker.lorem.paragraph(),
          handle: faker.lorem.slug(),
          image: {
            src: faker.image.urlPicsumPhotos(),
            alt: faker.lorem.words(),
            width: faker.number.int({ min: 100, max: 1000 }),
            height: faker.number.int({ min: 100, max: 1000 }),
            created_at: faker.date.past().toISOString(),
          },
          published: faker.datatype.boolean(),
          published_at: faker.date.past().toISOString(),
          published_scope: faker.helpers.arrayElement(
            Object.values(PublishedScope),
          ),
          sort_order: faker.helpers.arrayElement(Object.values(SortOrder)),
          template_suffix: faker.lorem.word(),
          title: faker.commerce.productName(),
          updated_at: faker.date.recent().toISOString(),
        });

        const savedCustomCollection = await newCustomCollection.save();

        for (let j = 0; j < collectsPerCollection; j++) {
          if (shuffledProductIds.length === 0) {
            throw new Error('Not enough products to generate collects');
          }

          const productId = shuffledProductIds.pop();

          const newCollect = new this.collectModel({
            collection_id: savedCustomCollection._id,
            product_id: productId,
            position: j + 1,
            sort_value: faker.lorem.word(),
          });

          await newCollect.save();
        }
      }
      return `Generate ${collectionCount} custom collection successfully`;
    } catch (error) {
      console.error('Error generating the collection : ', error);
      throw new Error('Failed to generate the collection.');
    }
  }

  async reset(): Promise<string> {
    try {
      await this.collectModel.deleteMany();
      await this.customCollectionModel.deleteMany();
      return 'Reset collections successfully';
    } catch (error) {
      console.error('Error resetting the collection : ', error);
      throw new Error('Failed to reset the database.');
    }
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
