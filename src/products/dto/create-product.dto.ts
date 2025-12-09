import { Decimal } from '@prisma/client/runtime/client';
import { Products } from 'generated/prisma/client';

export class CreateProductDto implements Products {
  name: string;
  id: number;
  key: string;
  price: Decimal;
}
