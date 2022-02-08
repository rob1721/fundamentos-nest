import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Get('/all')
  getOrders() {
    return 'all orders';
  }

  @Get('/:id')
  getOrder(@Param('id') orderId: string) {
    return 'con /sas/' + orderId;
  }

  @Post()
  createOrder(@Body() payload: any) {
    return {
      error: '',
      message: payload,
      status: 201,
    };
  }
}
