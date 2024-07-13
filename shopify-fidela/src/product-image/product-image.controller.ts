import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin/api/products')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':product_id/images')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Param('product_id') productId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductImageDto: CreateProductImageDto,
  ) {
    createProductImageDto.product_id = productId;
    createProductImageDto.src = file.path;
    createProductImageDto.variant_ids = JSON.parse(
      createProductImageDto.variant_ids.toString(),
    );
    return this.productImageService.create(createProductImageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':product_id/images')
  findAll(@Param('product_id') productId: string) {
    return this.productImageService.findAll(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':product_id/images/count')
  count(@Param('product_id') productId: string) {
    return this.productImageService.count(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':product_id/images/:image_id')
  findOne(
    @Param('product_id') productId: string,
    @Param('image_id') imageId: string,
  ) {
    return this.productImageService.findOne(productId, imageId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':product_id/images/:image_id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('product_id') productId: string,
    @Param('image_id') imageId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    if (file) {
      updateProductImageDto.src = file.path;
    }
    return this.productImageService.update(
      productId,
      imageId,
      updateProductImageDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':product_id/images/:image_id')
  remove(
    @Param('product_id') productId: string,
    @Param('image_id') imageId: string,
  ) {
    return this.productImageService.remove(productId, imageId);
  }
}
