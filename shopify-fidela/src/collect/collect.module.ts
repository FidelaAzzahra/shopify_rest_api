// src/collect/collect.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { Collect, CollectSchema } from './collect.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Collect.name, schema: CollectSchema }]),
  ],
  controllers: [CollectController],
  providers: [CollectService],
})
export class CollectModule {}
