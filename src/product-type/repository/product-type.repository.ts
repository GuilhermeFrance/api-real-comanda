import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateProductTypeDto } from '../dto/create-product-type.dto';
import { UpdateProductTypeDto } from '../dto/update-product-type.dto';
import { ProductTypeEntity } from '../entities/product-type.entity';

@Injectable()
export class ProductTypeRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateProductTypeDto): Promise<ProductTypeEntity> {
    return await this.prisma.productType.create({ data });
  }

  async findAll(): Promise<ProductTypeEntity[]> {
    return this.prisma.productType.findMany();
  }

  async findOne(id: number): Promise<ProductTypeEntity> {
    const productType = await this.prisma.productType.findUnique({
      where: { id },
    });
    if (!productType) {
      throw new NotFoundException('ProductType not found');
    }
    return productType;
  }

  async update(
    id: number,
    data: UpdateProductTypeDto,
  ): Promise<ProductTypeEntity> {
    const productType = await this.prisma.productType.findUnique({
      where: { id },
    });
    if (!productType) {
      throw new NotFoundException('ProductType not found');
    }
    return this.prisma.productType.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<ProductTypeEntity> {
    const productType = await this.prisma.productType.findUnique({
      where: { id },
    });
    if (!productType) {
      throw new NotFoundException('ProductType not found');
    }
    return this.prisma.productType.delete({
      where: { id },
    });
  }
}
