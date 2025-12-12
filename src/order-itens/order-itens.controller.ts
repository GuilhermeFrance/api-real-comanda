import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItensService } from './order-itens.service';
import { CreateOrderItenDto } from './dto/create-order-iten.dto';
import { UpdateOrderItenDto } from './dto/update-order-iten.dto';

@Controller('order-itens')
export class OrderItensController {
  constructor(private readonly orderItensService: OrderItensService) {}

  @Post()
  create(@Body() createOrderItenDto: CreateOrderItenDto) {
    return this.orderItensService.create(createOrderItenDto);
  }

  @Get('total/order/:id')
  calculate(@Param('id') id: string) {
    return this.orderItensService.calculate(+id);
  }

  @Get()
  findAll() {
    return this.orderItensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItensService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItenDto: UpdateOrderItenDto,
  ) {
    return this.orderItensService.update(+id, updateOrderItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItensService.remove(+id);
  }
}
