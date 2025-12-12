import { ProductType } from 'generated/prisma/client';

export class CreateProductTypeDto implements ProductType {
  name: string;
  id: number;
  key: string;
}
