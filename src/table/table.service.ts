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

  findAll() {
    return this.repository.findAll();
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
