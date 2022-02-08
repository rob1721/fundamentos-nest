import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
  @Get('/all')
  getCustomers() {
    return 'all customers';
  }

  @Get('/:id')
  getCustomer(@Param('id') customerId: string) {
    return 'con /sas/' + customerId;
  }

  @Post()
  createCustomer(@Body() payload: any) {
    return {
      error: '',
      message: payload,
      status: 201,
    };
  }
}
