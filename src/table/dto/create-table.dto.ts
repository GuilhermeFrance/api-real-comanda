import { Table } from 'generated/prisma/client';

export class CreateTableDto implements Table {
  name: string;
  id: number;
  key: string;
  userId: number | null;
  isBusy: boolean;
  orderId: number;
}
