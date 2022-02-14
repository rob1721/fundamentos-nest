import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandController } from './controllers/brand/brand.controller';
import { BrandService } from './services/brand/brand.service';

import { CategoryController } from './controllers/category/category.controller';
import { CategoryService } from './services/category/category.service';
import { Category } from './interfaces/category.entity';

import { CustomerController } from './controllers/customer/customer.controller';
import { CustomerService } from './services/customer/customer.service';
import { Customer } from './interfaces/customer.entity';

import { OrderController } from './controllers/order/order.controller';
import { OrderService } from './services/order/order.service';
import { Order } from './interfaces/order.entity';

import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { Product } from './interfaces/product.entity';

import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';

import { CConfigService } from './environment/config.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Category, Customer, Order, Product])], // se deben agregar todas las entities
  controllers: [
    BrandController,
    CategoryController,
    CustomerController,
    OrderController,
    ProductController,
    UserController,
  ],
  providers: [
    BrandService,
    CategoryService,
    CustomerService,
    OrderService,
    ProductService,
    UserService,
    CConfigService,
  ],
})
export class IndexModule {}
