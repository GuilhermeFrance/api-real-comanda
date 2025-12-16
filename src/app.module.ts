import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './shared/database/prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { BadgesModule } from './modules/badges/badges.module';
import { ProductsModule } from './modules/products/products.module';
import { OrderModule } from './modules/order/order.module';
import { TableModule } from './modules/table/table.module';
import { OrderItensModule } from './modules/order-itens/order-itens.module';
import { ProductTypeModule } from './modules/product-type/product-type.module';
import { AuthModule } from './auth/auth.module';
import { PaymentTypeModule } from './modules/payment-type/payment-type.module';
import { StatusModule } from './modules/status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    BadgesModule,
    ProductsModule,
    OrderModule,
    TableModule,
    OrderItensModule,
    ProductTypeModule,
    PaymentTypeModule,
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
