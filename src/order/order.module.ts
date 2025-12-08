import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { OrderRepository } from './repository/order.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, OrderRepository],
})
export class OrderModule {}
