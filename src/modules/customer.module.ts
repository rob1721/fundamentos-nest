import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from 'src/controllers/customer/customer.controller';
import { Customer } from 'src/interfaces/customer.entity';
import { CustomerService } from 'src/services/customer/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
