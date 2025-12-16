import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { StatusRepository } from './repository/status.repository';

@Module({
  controllers: [StatusController],
  providers: [StatusService, PrismaService, StatusRepository],
})
export class StatusModule {}
