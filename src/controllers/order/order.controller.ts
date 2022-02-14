import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from 'src/dtos/order.dto';
import { OrderService } from 'src/services/order/order.service';
import { ParseIntPipe } from 'src/shared/parse-int.pipe';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/all')
  getOrders() {
    return this.orderService.findAll();
  }

  @Get('/:id')
  getOrder(@Param('id', ParseIntPipe) orderId: number) {
    return this.orderService.findOne(orderId);
  }

  @Post()
  createOrder(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put('/:id')
  updateOrder(@Param('id') id: number, @Body() payload: UpdateOrderDto) {
    return this.orderService.update(id, payload);
  }

  @Delete('/:id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
