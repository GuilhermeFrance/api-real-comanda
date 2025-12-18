import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UsersService) {}
  login() {
    throw new Error('Method not implemented.');
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
