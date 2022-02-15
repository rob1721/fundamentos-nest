import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from 'src/interfaces/order.entity';
import { CreateOrderDto, UpdateOrderDto } from 'src/dtos/order.dto';

import { Client } from 'pg';

import { CustomerService } from 'src/services/customer/customer.service';
import { Product } from 'src/interfaces/product.entity';
import { Customer } from 'src/interfaces/customer.entity';

@Injectable()
export class OrderService {
  constructor(
    //private customerService: CustomerService,
    @Inject('PG') private readonly clientPg: Client,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find({
      relations: ['customer', 'products'],
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
      const customer = await this.customerRepo.findOne(payload.customerId);
      newOrder.customer = customer;
    }
    if (payload.productsIds) {
      const products = await this.productRepo.findByIds(payload.productsIds);
      let total = 0;
      products.map((product) => {
        total += product.price;
      });
      newOrder.totalCost = total;
      newOrder.products = products;
    }
    return this.orderRepo.save(newOrder);
  }

  async update(id: number, payload: UpdateOrderDto) {
    const orderToUpdate: Partial<Order> = payload;
    const order = await this.orderRepo.findOne(id);
    if (payload.customerId) {
      const customer = await this.customerRepo.findOne(payload.customerId);
      orderToUpdate.customer = customer;
    }
    if (payload.productsIds) {
      const products = await this.productRepo.findByIds(payload.productsIds);
      orderToUpdate.products = products;
    }
    this.orderRepo.merge(order, orderToUpdate);
    return this.orderRepo.save(order);
  }

  delete(id: number) {
    return this.orderRepo.delete(id);
  }
}
