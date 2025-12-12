import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductTypeRepository } from './repository/product-type.repository';

@Module({
  controllers: [ProductTypeController],
  providers: [ProductTypeService, PrismaService, ProductTypeRepository],
})
export class ProductTypeModule {}
