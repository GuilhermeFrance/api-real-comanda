import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { TableRepository } from './repository/table.repository';

@Injectable()
export class TableService {
  constructor(private readonly repository: TableRepository) {}
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

  remove(id: number) {
    return this.repository.remove(id);
  }
}
