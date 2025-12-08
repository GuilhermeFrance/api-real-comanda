import { Decimal } from '@prisma/client/runtime/index-browser';
import { Order } from 'generated/prisma/client';

export class CreateOrderDto implements Order {
  name: string;
  id: number;
  key: string;
  price: Decimal;
  productsKey: string | null;
}
