import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<ProductEntity> {
    return await this.prisma.products.create({
      data,
    });
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.prisma.products.findMany();
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.prisma.products.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, data: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.prisma.products.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.prisma.products.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<ProductEntity> {
    const product = await this.prisma.products.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.prisma.products.delete({
      where: { id },
    });
  }
}
