import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './database/prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { BadgesModule } from './badges/badges.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, BadgesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
