import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusRepository } from './repository/status.repository';

@Injectable()
export class StatusService {
  constructor(private readonly repository: StatusRepository) {}

  create(createStatusDto: CreateStatusDto) {
    return this.repository.create(createStatusDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateStatusDto: UpdateStatusDto) {
    return this.repository.update(id, updateStatusDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
