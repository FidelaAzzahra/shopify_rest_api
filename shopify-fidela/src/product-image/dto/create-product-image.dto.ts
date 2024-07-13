import { IsDate, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateProductImageDto {
  @IsDate() created_at: Date;
  @IsNumber() id: string;
  @IsNumber() position: number;
  @IsNumber() product_id: string;
  @IsArray() variant_ids: string[];
  @IsString() src: string;
  @IsNumber() width: number;
  @IsNumber() height: number;
  @IsDate() updated_at: Date;
}
