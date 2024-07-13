import {
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OptionDto {
  @IsString()
  option1: string;
}

class PresentmentPriceDto {
  @IsString()
  currency_code: string;

  @IsString()
  amount: string;
}

class PriceDto {
  @ValidateNested()
  @Type(() => PresentmentPriceDto)
  price: PresentmentPriceDto;

  @ValidateNested()
  @Type(() => PresentmentPriceDto)
  compare_at_price: PresentmentPriceDto;
}

class PresentmentPricesDto {
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  presentment_prices: PriceDto[];
}

export class CreateProductVariantDto {
  @IsString()
  barcode: string;

  @IsString()
  compare_at_price: string;

  @IsDate()
  created_at: Date;

  @IsString()
  fulfillment_service: string;

  @IsNumber()
  grams: number;

  @IsNumber()
  image_id: number;

  @IsNumber()
  inventory_item_id: number;

  @IsString()
  inventory_management: string;

  @IsString()
  inventory_policy: string;

  @IsNumber()
  inventory_quantity: number;

  @IsNumber()
  old_inventory_quantity: number;

  @ValidateNested()
  @Type(() => OptionDto)
  option: OptionDto;

  @ValidateNested()
  @Type(() => PresentmentPricesDto)
  presentment_prices: PresentmentPricesDto;

  @IsNumber()
  position: number;

  @IsString()
  price: string;

  @IsString()
  product_id: string;

  @IsBoolean()
  requires_shipping: boolean;

  @IsString()
  sku: string;

  @IsBoolean()
  taxable: boolean;

  @IsString()
  tax_code: string;

  @IsString()
  title: string;

  @IsDate()
  updated_at: Date;

  @IsNumber()
  weight: number;

  @IsString()
  weight_unit: string;
}
