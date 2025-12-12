import { OrderItems } from 'generated/prisma/client';

export class CreateOrderItenDto implements OrderItems {
  id: number;
  orderId: number;
  productsId: number;
  quantity: number;
  items: [];
}
