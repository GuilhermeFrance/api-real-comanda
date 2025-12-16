import { Injectable } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { PaymentTypeRepository } from './repository/payment-type.repository';

@Injectable()
export class PaymentTypeService {
  constructor(private readonly repository: PaymentTypeRepository) {}

  create(createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.repository.create(createPaymentTypeDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updatePaymentTypeDto: UpdatePaymentTypeDto) {
    return this.repository.update(id, updatePaymentTypeDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
