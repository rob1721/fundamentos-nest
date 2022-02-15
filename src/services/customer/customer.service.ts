import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from 'src/interfaces/customer.entity';

import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class CustomerService {
  constructor(
    private productService: ProductService,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo
      .createQueryBuilder('customer')
      .innerJoinAndSelect('customer.orders', 'order')
      .innerJoinAndSelect('order.products', 'product')
      .getMany();
    return this.customerRepo.find({
      relations: ['orders'],
    });
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id, {
      relations: ['orders'],
    });
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return customer;
  }

  async getCustomerOrders(id: number) {
    const customer = await this.findOne(id);
    return {
      customer,
    };
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(payload);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, payload: UpdateCustomerDto) {
    const customerToUpdate: Partial<Customer> = payload;
    const customer = await this.findOne(id);
    this.customerRepo.merge(customer, customerToUpdate);
    return this.customerRepo.save(customer);
  }

  delete(id: number) {
    return this.customerRepo.delete(id);
  }
}
