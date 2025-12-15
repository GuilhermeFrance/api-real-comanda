import { OrderItems } from 'generated/prisma/client';

export class CreateOrderItenDto implements OrderItems {
  createdAt: Date;
  id: number;
  orderId: number;
  productsId: number;
  quantity: number;
  items: [];
}
