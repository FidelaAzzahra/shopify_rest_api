import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class RefreshToken {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Admin' })
  admin: Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expires: Date;
}

export type RefreshTokenDocument = RefreshToken & Document;
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
