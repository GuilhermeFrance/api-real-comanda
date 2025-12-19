import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';
import { UserPayload } from '../models/user-payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '../models/user-token';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  login(user: UserEntity): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      name: `${user.firstName} ${user.surname}`,
      cpf: user.cpf,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(cpf: any, password: string) {
    const user = await this.userService.findByCpf(cpf);

    if (user) {
      const passwordValid = await bcrypt.compare(password, user.password);

      if (passwordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('CPF ou senha incorretos...');
  }
}
