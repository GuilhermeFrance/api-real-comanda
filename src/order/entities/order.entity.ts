import { Decimal } from '@prisma/client/runtime/index-browser';

export class OrderEntity {
  name: string;
  id: number;
  key: string;
  price: Decimal;
  productsKey: string[];
}
