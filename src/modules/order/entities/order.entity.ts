import { StatusEntity } from 'src/modules/status/entities/status.entity';
import { OrderItensEntity } from '../../order-itens/entities/order-iten.entity';
import { TableEntity } from '../../table/entities/table.entity';

export class OrderEntity {
  id: number;
  name: string | null;
  key: string | null;
  createdAt: Date;
  openedAt: Date | null;
  closedAt: Date | null;
  paymentKey: string | null;
  items?: OrderItensEntity[];
  tables?: TableEntity | null;
  status?: StatusEntity | null;
}
