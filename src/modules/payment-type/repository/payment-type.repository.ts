import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { PaymentTypeEntity } from '../entities/payment-type.entity';
import { CreatePaymentTypeDto } from '../dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from '../dto/update-payment-type.dto';

@Injectable()
export class PaymentTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePaymentTypeDto): Promise<PaymentTypeEntity> {
    return await this.prisma.paymentType.create({
      data,
    });
  }

  async findAll(): Promise<PaymentTypeEntity[]> {
    return await this.prisma.paymentType.findMany();
  }

  async findOne(id: number): Promise<PaymentTypeEntity> {
    const paymentType = await this.prisma.paymentType.findUnique({
      where: { id },
    });
    if (!paymentType) {
      throw new NotFoundException('Payment type not found');
    }
    return paymentType;
  }

  async update(
    id: number,
    data: UpdatePaymentTypeDto,
  ): Promise<PaymentTypeEntity> {
    const paymentType = await this.prisma.paymentType.findUnique({
      where: { id },
    });
    if (!paymentType) {
      throw new NotFoundException('Payment type not found');
    }
    return await this.prisma.paymentType.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<PaymentTypeEntity> {
    const paymentType = await this.prisma.paymentType.findUnique({
      where: { id },
    });
    if (!paymentType) {
      throw new NotFoundException('Payment type not found');
    }
    return await this.prisma.paymentType.delete({
      where: { id },
    });
  }
}
