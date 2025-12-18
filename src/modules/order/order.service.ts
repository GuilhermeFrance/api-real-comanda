import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './repository/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly repository: OrderRepository) {}
  create(createOrderDto: CreateOrderDto) {
    return this.repository.create(createOrderDto);
  }

  orderHistory() {
    return this.repository.orderHistory();
  }

  findAll() {
    return this.repository.findAll();
  }

  choicePayment(id: number, data: string) {
    return this.repository.choicePayment(id, data);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.repository.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
