import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

class Image {
  @IsNumber()
  id: number;

  @IsNumber()
  product_id: number;

  @IsNumber()
  position: number;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsString()
  src: string;

  @IsArray()
  variant_ids: Array<Record<string, any>>;
}

class Option {
  @IsNumber()
  id: number;

  @IsNumber()
  product_id: number;

  @IsString()
  name: string;

  @IsNumber()
  position: number;

  @IsArray()
  values: string[];
}

class Variant {
  @IsString()
  barcode: string;

  @IsString()
  compare_at_price: string | null;

  @IsString()
  created_at: string;

  @IsString()
  fulfillment_service: string;

  @IsNumber()
  grams: number;

  @IsNumber()
  weight: number;

  @IsString()
  weight_unit: string;

  @IsNumber()
  id: number;

  @IsNumber()
  inventory_item_id: number;

  @IsString()
  inventory_management: string;

  @IsString()
  inventory_policy: string;

  @IsNumber()
  inventory_quantity: number;

  @IsString()
  option1: string;

  @IsNumber()
  position: number;

  @IsNumber()
  price: number;

  @IsNumber()
  product_id: number;

  @IsBoolean()
  requires_shipping: boolean;

  @IsString()
  sku: string;

  @IsBoolean()
  taxable: boolean;

  @IsString()
  title: string;

  @IsString()
  updated_at: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  body_html: string;

  @IsString()
  created_at: string;

  @IsString()
  @IsNotEmpty()
  handle: string;

  @IsNumber()
  id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: Image[];

  @ValidateNested()
  @Type(() => Option)
  options: Option;

  @IsString()
  @IsNotEmpty()
  product_type: string;

  @IsString()
  published_at: string;

  @IsString()
  published_scope: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  tags: string;

  @IsString()
  template_suffix: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  updated_at: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Variant)
  variants: Variant[];

  @IsString()
  @IsNotEmpty()
  vendor: string;
}
