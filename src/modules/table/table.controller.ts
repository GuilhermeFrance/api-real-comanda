import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { User } from 'generated/prisma/client';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @Patch('initialize/:id')
  initializaeTable(
    @Param('id') id: string,
    @Body() updateTableDto: UpdateTableDto,
  ) {
    return this.tableService.initializeTable(+id, updateTableDto);
  }

  @Patch('/finalize/:id')
  finalizeTable(
    @Param('id') id: string,
    @Body() updateTableDto: UpdateTableDto,
  ) {
    return this.tableService.finalizeTable(+id, updateTableDto);
  }
  @Post('/order')
  createWithOrder(@Body() createTableDto: CreateTableDto) {
    return this.tableService.createWithOrder(createTableDto);
  }

  @Get('/history')
  tableHistory() {
    return this.tableService.tableHistory();
  }

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Get('infos')
  getAllWithPrice() {
    return this.tableService.returnWithPrice();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(+id, updateTableDto);
  }

  @Patch('/payment/:id')
  choicePayment(@Param('id') id: string, @Body() body: { paymentKey: string }) {
    return this.tableService.choicePayment(+id, body.paymentKey);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.tableService.remove(+id, user);
  }
}
