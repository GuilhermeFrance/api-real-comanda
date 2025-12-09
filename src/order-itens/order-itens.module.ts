import { Module } from '@nestjs/common';
import { OrderItensService } from './order-itens.service';
import { OrderItensController } from './order-itens.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { OrderItensRepository } from './repository/order-itens.repository';

@Module({
  controllers: [OrderItensController],
  providers: [OrderItensService, PrismaService, OrderItensRepository],
})
export class OrderItensModule {}
