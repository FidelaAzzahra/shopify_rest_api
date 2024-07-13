// src/collect/collect.controller.ts

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CreateCollectDto } from './dto/create-collect.dto';

@Controller('admin/api/collects')
export class CollectController {
  constructor(private readonly collectService: CollectService) {}

  @Post()
  create(@Body() createCollectDto: CreateCollectDto) {
    return this.collectService.create(createCollectDto);
  }

  @Get()
  findAll() {
    return this.collectService.findAll();
  }

  @Get('count')
  count() {
    return this.collectService.count();
  }

  @Get(':collect_id')
  findOne(@Param('collect_id') id: string) {
    return this.collectService.findOne(id);
  }

  @Delete(':collect_id')
  remove(@Param('collect_id') id: string) {
    return this.collectService.remove(id);
  }
}
