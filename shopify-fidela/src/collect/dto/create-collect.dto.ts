// src/collect/dto/create-collect.dto.ts

export class CreateCollectDto {
  readonly collection_id: string;
  readonly product_id: string;
  readonly position?: number;
  readonly sort_value?: string;
}
