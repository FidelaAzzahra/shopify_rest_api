import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('admin/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('seed/:count')
  async seed(@Param('count') count: number): Promise<string> {
    return this.productService.seed(count);
  }

  @Get('reset')
  async reset(): Promise<string> {
    return this.productService.reset();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('ids') ids?: string) {
    return this.productService.findAll(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Get('count')
  count() {
    return this.productService.count();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':product_id')
  findOne(@Param('product_id') productId: string) {
    return this.productService.findOne(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':product_id')
  update(
    @Param('product_id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(productId, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':product_id')
  remove(@Param('product_id') productId: string) {
    return this.productService.remove(productId);
  }
}
