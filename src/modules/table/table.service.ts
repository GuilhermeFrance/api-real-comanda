import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { TableRepository } from './repository/table.repository';
import { CaslAbilityService } from 'src/auth/casl/casl-ability/casl-ability.service';
import { User } from 'generated/prisma/client';

@Injectable()
export class TableService {
  constructor(
    private readonly repository: TableRepository,
    private readonly abilityService: CaslAbilityService,
  ) {}
  create(createTableDto: CreateTableDto) {
    return this.repository.create(createTableDto);
  }

  initializeTable(id: number, update: UpdateTableDto) {
    return this.repository.initializeTable(id, update);
  }

  finalizeTable(id: number, updateTableDto: UpdateTableDto) {
    return this.repository.finalizeTable(id, updateTableDto);
  }

  choicePayment(id: number, paymentKey: string) {
    return this.repository.choicePayment(id, paymentKey);
  }

  findAll() {
    return this.repository.findAll();
  }
  returnWithPrice() {
    return this.repository.returnWithPrice();
  }

  createWithOrder(createTableDto: CreateTableDto) {
    return this.repository.createTableWithOrder(createTableDto);
  }

  tableHistory() {
    return this.repository.tableHistory();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return this.repository.update(id, updateTableDto);
  }

  remove(id: number, currentUser: User) {
    const ability = this.abilityService.createForUser(currentUser);

    if (!ability.can('manage', 'all')) {
      throw new UnauthorizedException(
        'Seu usuário não tem permissão para esta ação',
      );
    }
    return this.repository.remove(id);
  }
}
