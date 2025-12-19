import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/auth/authentication/authentication.service';
import { UserRepository } from 'src/auth/users/repository/user.repository';
import { UsersService } from 'src/auth/users/users.service';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CaslAbilityService } from './casl-ability.service';

@Global()
@Module({
  providers: [
    CaslAbilityService,
    AuthenticationService,
    JwtService,
    UsersService,
    UserRepository,
    PrismaService,
  ],
})
export class CaslModule {}
