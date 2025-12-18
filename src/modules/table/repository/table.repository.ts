import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { TableEntity } from '../entities/table.entity';
import { UpdateTableDto } from '../dto/update-table.dto';
import { CreateTableDto } from '../dto/create-table.dto';

@Injectable()
export class TableRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTableDto): Promise<TableEntity> {
    return await this.prisma.table.create({
      data,
    });
  }

  async initializeTable(id: number, updateTableDto: UpdateTableDto) {
    return this.prisma.table.update({
      where: { id },
      data: {
        ...updateTableDto,
        isBusy: true,
      },
    });
  }

  async finalizeTable(id: number, updateTableDto: UpdateTableDto) {
    const table = await this.prisma.table.findUnique({
      where: { id },
      select: {
        orderId: true,
        order: {
          select: {
            name: true,
            key: true,
          },
        },
      },
    });
    if (!table) {
      throw new NotFoundException('Table not found');
    }

    return await this.prisma.$transaction(async (prisma) => {
      await prisma.order.update({
        where: { id: table.orderId },
        data: {
          statusKey: 'FECHADO',
          closedAt: new Date(),
        },
      });

      const newOrder = this.prisma.order.create({
        data: {
          name: table.order.name,
          key: table.order.key,
          statusKey: 'ABERTO',
        },
      });

      return await this.prisma.table.update({
        where: { id },
        data: {
          ...updateTableDto,
          isBusy: false,
          orderId: (await newOrder).id,
        },
      });
    });
  }

  async finalizeTableWithAndCreateNewOrder(
    id: number,
    updateTableDto: UpdateTableDto,
  ) {
    const table = await this.prisma.table.findUnique({
      where: { id },
      select: {
        orderId: true,
      },
    });
    if (!table) {
      throw new NotFoundException('Table not found');
    }

    return await this.prisma.$transaction(async (prisma) => {
      await prisma.order.update({
        where: { id: table.orderId },
        data: {
          statusKey: 'FECHADO',
          closedAt: new Date(),
        },
      });

      return await this.prisma.table.update({
        where: { id },
        data: {
          ...updateTableDto,
          isBusy: false,
        },
      });
    });
  }

  async choicePayment(tableId: number, paymentKey: string) {
    const table = await this.prisma.table.findUnique({
      where: { id: tableId },
      select: { orderId: true },
    });

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    return await this.prisma.order.update({
      where: { id: table.orderId },
      data: {
        paymentKey: paymentKey,
      },
    });
  }

  async returnWithPrice() {
    const tables = await this.prisma.table.findMany({
      include: {
        order: {
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
        },
      },
    });

    return tables.map((table) => ({
      ...table,
      order: table.order
        ? {
            id: table.order.id,
            name: table.order.name,
            items: table.order.items,
            totalPrice: table.order.items.reduce((total, item) => {
              return total + item.products.price.toNumber() * item.quantity;
            }, 0),
          }
        : null,
    }));
  }
  async createTableWithOrder(data: {
    name: string;
    key?: string;
    userId?: number | null;
  }) {
    return await this.prisma.$transaction(async (prisma) => {
      const orderName = `Comanda - ${data.name}`;
      const orderKey = `Comanda -${data.key || Date.now()}`;
      const order = await prisma.order.create({
        data: {
          name: orderName,
          key: orderKey,
        },
      });
      const table = await prisma.table.create({
        data: {
          name: data.name,
          key: data.key || `mesa-${Date.now()}`,
          userId: data.userId || null,
          orderId: order.id,
        },
      });

      return { table, order };
    });
  }

  async tableHistory(): Promise<TableEntity[]> {
    const history = await this.prisma.table.findMany({
      where: {
        order: {
          is: {
            status: {
              is: {
                key: 'FECHADO',
              },
            },
          },
        },
      },
      include: {
        order: {
          include: {
            payment: {
              select: {
                name: true,
              },
            },
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
        },
      },
    });
    return history;
  }

  async findAll(): Promise<TableEntity[]> {
    return await this.prisma.table.findMany();
  }

  async findOne(id: number): Promise<TableEntity> {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });
    if (!table) {
      throw new NotFoundException('table not found');
    }
    return table;
  }

  async update(id: number, data: UpdateTableDto): Promise<TableEntity> {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });
    if (!table) {
      throw new NotFoundException('table not found');
    }
    return this.prisma.table.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<TableEntity> {
    const table = await this.prisma.table.findUnique({
      where: { id },
    });
    if (!table) {
      throw new NotFoundException('table not found');
    }
    return this.prisma.table.delete({
      where: { id },
    });
  }
}
