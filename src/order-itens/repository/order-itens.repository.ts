import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { OrderItensEntity } from '../entities/order-iten.entity';
import { CreateOrderItenDto } from '../dto/create-order-iten.dto';
import { UpdateOrderItenDto } from '../dto/update-order-iten.dto';

@Injectable()
export class OrderItensRepository {
  constructor(private readonly prisma: PrismaService) {}

  async calculateTotalPrice(orderId: number): Promise<number> {
    const orderWithItens = await this.prisma.order.findUnique({
      where: { id: orderId },
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
    if (!orderWithItens) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    const total = orderWithItens.items.reduce((accumulator, item) => {
      const productPrice = item.products.price.toNumber();
      const itemSubtotal = productPrice * item.quantity;
      console.log(
        `Item: produto=${item.productsId}, qty=${item.quantity}, preço=${productPrice}, subtotal=${itemSubtotal}`,
      );
      return accumulator + itemSubtotal;
    }, 0);
    return total;
  }

  async create(data: CreateOrderItenDto): Promise<OrderItensEntity> {
    return await this.prisma.orderItems.create({
      data,
    });
  }

  async findAll(): Promise<OrderItensEntity[]> {
    return await this.prisma.orderItems.findMany();
  }

  async findOne(id: number): Promise<OrderItensEntity> {
    const orderItems = await this.prisma.orderItems.findUnique({
      where: { id },
    });
    if (!orderItems) {
      throw new NotFoundException('orderItems not found');
    }
    return orderItems;
  }

  async update(
    id: number,
    data: UpdateOrderItenDto,
  ): Promise<OrderItensEntity> {
    const orderItems = await this.prisma.orderItems.findUnique({
      where: { id },
    });
    if (!orderItems) {
      throw new NotFoundException('orderItems not found');
    }
    return this.prisma.orderItems.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<OrderItensEntity> {
    const orderItems = await this.prisma.orderItems.findUnique({
      where: { id },
    });
    if (!orderItems) {
      throw new NotFoundException('orderItems not found');
    }
    return this.prisma.orderItems.delete({
      where: { id },
    });
  }
}
