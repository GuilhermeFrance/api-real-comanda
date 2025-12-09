import { Injectable } from '@nestjs/common';
import { CreateOrderItenDto } from './dto/create-order-iten.dto';
import { UpdateOrderItenDto } from './dto/update-order-iten.dto';

@Injectable()
export class OrderItensService {
  create(createOrderItenDto: CreateOrderItenDto) {
    return 'This action adds a new orderIten';
  }

  findAll() {
    return `This action returns all orderItens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderIten`;
  }

  update(id: number, updateOrderItenDto: UpdateOrderItenDto) {
    return `This action updates a #${id} orderIten`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderIten`;
  }
}
