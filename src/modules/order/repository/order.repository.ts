import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderDto): Promise<OrderEntity> {
    return await this.prisma.order.create({
      data,
      include: {
        items: true,
        tables: true,
      },
    });
  }

  async orderHistory() {
    const order = await this.prisma.order.findMany({
      where: {
        status: {
          is: {
            key: 'FECHADO',
          },
        },
      },
      include: {
        items: {
          include: {
            products: {
              select: {
                price: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return order.map((order) => ({
      ...order,
      price: order
        ? {
            total: order.items.reduce((total, item) => {
              return total + item.products.price.toNumber() * item.quantity;
            }, 0),
          }
        : null,
    }));
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.prisma.order.findMany({
      include: {
        items: true,
        tables: true,
      },
    });
  }

  async choicePayment(id: number, paymentKey: string) {
    const table = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    return await this.prisma.order.update({
      where: { id },
      data: { paymentKey: paymentKey },
    });
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        tables: true,
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: number, data: UpdateOrderDto): Promise<OrderEntity> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.prisma.order.update({
      where: { id },
      data,
      include: {
        items: true,
        tables: true,
      },
    });
  }

  async remove(id: number): Promise<OrderEntity> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.prisma.order.delete({
      where: { id },
      include: {
        items: true,
        tables: true,
      },
    });
  }
}
