import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomCollectionDto } from './create-custom-collection.dto';

export class UpdateCustomCollectionDto extends PartialType(
  CreateCustomCollectionDto,
) {}
