import { PartialType } from '@nestjs/swagger';
import { CreateOrderItenDto } from './create-order-iten.dto';

export class UpdateOrderItenDto extends PartialType(CreateOrderItenDto) {}
