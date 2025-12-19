import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createClientDto: CreateUserDto): Promise<UserEntity> {
    const passwordHash: string = await bcrypt.hash(
      createClientDto.password,
      10,
    );

    const data = {
      firstName: createClientDto.firstName,
      surname: createClientDto.surname,
      cpf: createClientDto.cpf,
      password: passwordHash,
      badgesKey: createClientDto.badgesKey,
    };

    const created = await this.prisma.user.create({
      data,
      select: {
        id: true,
        firstName: true,
        surname: true,
        cpf: true,
        badgesKey: true,
      },
    });
    return created as unknown as CreateUserDto;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByCpf(cpf: string) {
    const user = await this.prisma.user.findUnique({
      where: { cpf },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        surname: data.surname,
        cpf: data.cpf,
        badgesKey: data.badgesKey,
      },
    });
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
