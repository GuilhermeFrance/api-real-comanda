import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './database/prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { BadgesModule } from './badges/badges.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { TableModule } from './table/table.module';
import { OrderItensModule } from './order-itens/order-itens.module';
import { ProductTypeModule } from './product-type/product-type.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, BadgesModule, ProductsModule, OrderModule, TableModule, OrderItensModule, ProductTypeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
