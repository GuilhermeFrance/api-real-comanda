import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { TableRepository } from './repository/table.repository';

@Module({
  controllers: [TableController],
  providers: [TableService, PrismaService, TableRepository],
})
export class TableModule {}
