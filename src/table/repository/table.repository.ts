import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
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
