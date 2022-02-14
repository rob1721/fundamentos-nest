import { Global, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from 'src/interfaces/order.entity';
import { CreateOrderDto, UpdateOrderDto } from 'src/dtos/order.dto';

import { Client } from 'pg';

import { CustomerService } from 'src/services/customer/customer.service';

@Global()
@Injectable()
export class OrderService {
  constructor(
    private customerService: CustomerService,
    @Inject('PG') private readonly clientPg: Client,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  findAll() {
    return this.orderRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id, {
      relations: ['customer'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async findByCustomer(customerId: number) {
    const orders = await this.orderRepo.find({
      where: { customerId: customerId },
    });
    return {
      orders,
    };
  }

  async create(payload: CreateOrderDto) {
    const newOrder = this.orderRepo.create(payload);
    if (payload.customerId) {
      const customer = await this.customerService.findOne(payload.customerId);
      newOrder.customer = customer;
    }
    return this.orderRepo.save(newOrder);
  }

  async update(id: number, payload: UpdateOrderDto) {
    const orderToUpdate: Partial<Order> = payload;
    const order = await this.findOne(id);
    if (payload.customerId) {
      const customer = await this.customerService.findOne(payload.customerId);
      orderToUpdate.customer = customer;
    }
    this.orderRepo.merge(order, orderToUpdate);
    return this.orderRepo.save(order);
  }

  delete(id: number) {
    return this.orderRepo.delete(id);
  }
}
