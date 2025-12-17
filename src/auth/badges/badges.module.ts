import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { BadgeRepository } from './repository/badge.repository';

@Module({
  controllers: [BadgesController],
  providers: [BadgesService, PrismaService, BadgeRepository],
})
export class BadgesModule {}
