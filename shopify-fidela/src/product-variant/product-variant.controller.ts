import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductVariantService } from './product-variant.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin/api')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @UseGuards(JwtAuthGuard)
  @Post('products/:productId/variants')
  async create(
    @Param('productId') productId: string,
    @Body() createProductVariantDto: CreateProductVariantDto,
  ) {
    createProductVariantDto.product_id = productId;
    return this.productVariantService.create(createProductVariantDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('products/:productId/variants')
  async findAll(@Param('productId') productId: string) {
    return this.productVariantService.findAll(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('products/:productId/variants/count')
  async count(@Param('productId') productId: string) {
    return this.productVariantService.count(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('variants/:variantId')
  async findOne(@Param('variantId') variantId: string) {
    return this.productVariantService.findOne(variantId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('variants/:variantId')
  async update(
    @Param('variantId') variantId: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return this.productVariantService.update(
      variantId,
      updateProductVariantDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('products/:productId/variants/:variantId')
  async remove(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ) {
    return this.productVariantService.remove(productId, variantId);
  }
}
