import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './shared/database/prisma/prisma.service';
import { UsersModule } from './auth/users/users.module';
import { BadgesModule } from './auth/badges/badges.module';
import { ProductsModule } from './modules/products/products.module';
import { OrderModule } from './modules/order/order.module';
import { TableModule } from './modules/table/table.module';
import { OrderItensModule } from './modules/order-itens/order-itens.module';
import { ProductTypeModule } from './modules/product-type/product-type.module';
import { PaymentTypeModule } from './modules/payment-type/payment-type.module';
import { StatusModule } from './modules/status/status.module';
import { AuthenticationModule } from './auth/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    BadgesModule,
    ProductsModule,
    OrderModule,
    TableModule,
    OrderItensModule,
    ProductTypeModule,
    PaymentTypeModule,
    StatusModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
