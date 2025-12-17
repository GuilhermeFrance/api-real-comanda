import { User } from 'generated/prisma/client';

export class CreateUserDto implements User {
  id: number;
  firstName: string;
  surname: string;
  cpf: string;
  password: string;
  badgesKey: string | null;
}
