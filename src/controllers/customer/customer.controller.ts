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
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dto';
import { CustomerService } from 'src/services/customer/customer.service';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('/all')
  getCustomers() {
    return this.customerService.findAll();
  }

  @Get('/:id')
  getCustomer(@Param('id') customerId: number) {
    return this.customerService.findOne(customerId);
  }

  @Get('/:id/orders')
  getCustomerOrders(@Param('id') customerId: number) {
    return this.customerService.getCustomerOrders(customerId);
  }

  @Post()
  createCustomer(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(id, payload);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    return this.customerService.delete(id);
  }
}
