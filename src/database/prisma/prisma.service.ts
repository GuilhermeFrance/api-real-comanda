import { Injectable } from '@nestjs/common';
import { PrismaPostgresAdapter } from '@prisma/adapter-ppg';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPostgresAdapter({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }
}
