// src/collect/collect.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collect, CollectDocument } from './collect.schema';
import { CreateCollectDto } from './dto/create-collect.dto';

@Injectable()
export class CollectService {
  constructor(
    @InjectModel(Collect.name) private collectModel: Model<CollectDocument>,
  ) {}

  async create(createCollectDto: CreateCollectDto): Promise<Collect> {
    const createdCollect = new this.collectModel(createCollectDto);
    return createdCollect.save();
  }

  async findAll(): Promise<Collect[]> {
    return this.collectModel.find().exec();
  }

  async findOne(id: string): Promise<Collect> {
    try {
      const collect = await this.collectModel.findById(id).exec();
      if (!collect) {
        throw new NotFoundException(`Collect with ID "${id}" not found`);
      }
      return collect;
    } catch (error) {
      console.error(`Error: Collect with ID ${id} not found`);
      throw new NotFoundException(`Collect with ID "${id}" not found`);
    }
  }

  async count(): Promise<number> {
    return this.collectModel.countDocuments().exec();
  }

  async remove(id: string): Promise<Collect> {
    const result = await this.collectModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Collect with ID "${id}" not found`);
    }
    return result;
  }
}
