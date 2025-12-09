import { Injectable } from '@nestjs/common';
import { CreateOrderItenDto } from './dto/create-order-iten.dto';
import { UpdateOrderItenDto } from './dto/update-order-iten.dto';
import { OrderItensRepository } from './repository/order-itens.repository';

@Injectable()
export class OrderItensService {
  constructor(private readonly repository: OrderItensRepository) {}
  create(createOrderItenDto: CreateOrderItenDto) {
    return this.repository.create(createOrderItenDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  calculate(id: number) {
    return this.repository.calculateTotalPrice(id);
  }

  update(id: number, updateOrderItenDto: UpdateOrderItenDto) {
    return this.repository.update(id, updateOrderItenDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
