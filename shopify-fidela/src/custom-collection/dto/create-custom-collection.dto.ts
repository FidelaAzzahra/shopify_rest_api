import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCustomCollectionDto {
  @IsString()
  body_html: string;

  @IsString()
  handle: string;

  @IsOptional()
  image?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    created_at?: string;
  };

  @IsBoolean()
  published: boolean;

  @IsString()
  published_at: string;

  @IsString()
  published_scope: string;

  @IsString()
  sort_order: string;

  @IsString()
  template_suffix: string;

  @IsString()
  title: string;

  @IsString()
  updated_at: string;
}
