import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductRepository } from './repository/products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, ProductRepository],
})
export class ProductsModule {}
