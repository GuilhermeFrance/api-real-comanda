import { Decimal } from '@prisma/client/runtime/index-browser';
import { Order } from 'generated/prisma/client';

export class CreateOrderDto implements Order {
  createdAt: Date;
  closedAt: Date | null;
  name: string;
  id: number;
  key: string;
  price: Decimal;
}
