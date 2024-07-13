import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PublishedScope, SortOrder } from 'src/types/enums';

@Schema()
export class CustomCollection {
  @Prop({ required: true })
  body_html: string;

  @Prop({ required: true })
  handle: string;

  @Prop({
    type: {
      src: String,
      alt: String,
      width: Number,
      height: Number,
      created_at: String,
    },
    required: false,
  })
  image?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    created_at?: string;
  };

  @Prop({ required: true })
  published: boolean;

  @Prop({ required: true })
  published_at: string;

  @Prop({ required: true, type: String, enum: PublishedScope })
  published_scope: PublishedScope; // web global

  @Prop({ required: true, type: String, enum: SortOrder })
  sort_order: SortOrder; // alpha-asc, alpha-desc, best-selling, created, created-desc, manual, price-asc, price-desc

  @Prop({ required: true })
  template_suffix: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  updated_at: string;
}

export type CustomCollectionDocument = CustomCollection & Document;
export const CustomCollectionSchema =
  SchemaFactory.createForClass(CustomCollection);
