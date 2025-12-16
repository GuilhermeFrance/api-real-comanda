import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateStatusDto } from '../dto/create-status.dto';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { StatusEntity } from '../entities/status.entity';

@Injectable()
export class StatusRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateStatusDto): Promise<StatusEntity> {
    return await this.prisma.status.create({
      data,
    });
  }

  async findAll(): Promise<StatusEntity[]> {
    return await this.prisma.status.findMany();
  }

  async findOne(id: number): Promise<StatusEntity> {
    const status = await this.prisma.status.findUnique({
      where: { id },
    });
    if (!status) {
      throw new NotFoundException('Status not found!');
    }
    return status;
  }

  async update(
    id: number,
    updateStatusDto: UpdateStatusDto,
  ): Promise<StatusEntity> {
    const status = await this.prisma.status.findUnique({
      where: { id },
    });
    if (!status) {
      throw new NotFoundException('Status not found!');
    }
    return this.prisma.status.update({
      where: { id },
      data: updateStatusDto,
    });
  }

  async remove(id: number): Promise<StatusEntity> {
    const status = await this.prisma.status.findUnique({
      where: { id },
    });
    if (!status) {
      throw new NotFoundException('Status not found!');
    }
    return this.prisma.status.delete({
      where: { id },
    });
  }
}
