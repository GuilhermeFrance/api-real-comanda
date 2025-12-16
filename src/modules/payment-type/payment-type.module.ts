import { Module } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { PaymentTypeController } from './payment-type.controller';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { PaymentTypeRepository } from './repository/payment-type.repository';

@Module({
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService, PrismaService, PaymentTypeRepository],
})
export class PaymentTypeModule {}
