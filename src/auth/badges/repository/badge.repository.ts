import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateBadgeDto } from '../dto/create-badge.dto';
import { UpdateBadgeDto } from '../dto/update-badge.dto';
import { BadgeEntity } from '../entities/badge.entity';

@Injectable()
export class BadgeRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateBadgeDto): Promise<BadgeEntity> {
    return this.prisma.badge.create({
      data: dto,
    });
  }

  async findAll(): Promise<BadgeEntity[]> {
    return this.prisma.badge.findMany();
  }

  async findOne(id: number): Promise<BadgeEntity> {
    const badge = await this.prisma.badge.findUnique({
      where: { id },
    });
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }
    return badge;
  }

  async update(id: number, dto: UpdateBadgeDto): Promise<BadgeEntity> {
    const badge = await this.prisma.badge.findUnique({
      where: { id },
    });
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }
    return this.prisma.badge.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<BadgeEntity> {
    const badge = await this.prisma.badge.findUnique({
      where: { id },
    });
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }
    return this.prisma.badge.delete({
      where: { id },
    });
  }
}
