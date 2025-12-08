import { Decimal } from '@prisma/client/runtime/client';

export class ProductEntity {
  name: string;
  id: number;
  key: string;
  price: Decimal;
  orderId: number | null;
}
