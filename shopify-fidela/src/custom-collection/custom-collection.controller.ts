import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CustomCollectionService } from './custom-collection.service';
import { CreateCustomCollectionDto } from './dto/create-custom-collection.dto';
import { UpdateCustomCollectionDto } from './dto/update-custom-collection.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('admin/api/custom_collections')
export class CustomCollectionController {
  constructor(
    private readonly customCollectionService: CustomCollectionService,
  ) {}

  @Get('seed/:collection/collect/:collect')
  async seed(
    @Param('collection') collection: number,
    @Param('collect') collect: number,
  ): Promise<string> {
    return this.customCollectionService.seed(collection, collect);
  }

  @Get('reset')
  async reset(): Promise<string> {
    return this.customCollectionService.reset();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'uploads/custom-collection',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCustomCollectionDto: CreateCustomCollectionDto,
  ) {
    if (file) {
      createCustomCollectionDto.image = {
        src: file.path,
        alt: file.originalname,
        width: file.size,
        height: file.size,
        created_at: new Date().toISOString(),
      };
    }

    return this.customCollectionService.create(createCustomCollectionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.customCollectionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('count')
  count() {
    return this.customCollectionService.count();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':custom_collection_id')
  findOne(@Param('custom_collection_id') id: string) {
    return this.customCollectionService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':custom_collection_id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'uploads/custom-collection',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async update(
    @Param('custom_collection_id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateCustomCollectionDto: UpdateCustomCollectionDto,
  ) {
    if (file) {
      updateCustomCollectionDto.image = {
        src: file.path,
        alt: file.originalname,
        width: file.size,
        height: file.size,
        created_at: new Date().toISOString(),
      };
    }
    return this.customCollectionService.update(id, updateCustomCollectionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':custom_collection_id')
  remove(@Param('custom_collection_id') id: string) {
    return this.customCollectionService.remove(id);
  }
}
