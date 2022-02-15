import { Module } from '@nestjs/common';
import { HttpService, HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { firstValueFrom, lastValueFrom } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';

import { environments } from './environment';
import config from './config';

import { BrandService } from './services/brand/brand.service';
import { CategoryService } from './services/category/category.service';
import { CustomerService } from './services/customer/customer.service';
import { OrderService } from './services/order/order.service';
import { ProductService } from './services/product/product.service';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './interfaces/category.entity';
import { Customer } from './interfaces/customer.entity';
import { Order } from './interfaces/order.entity';
import { Product } from './interfaces/product.entity';
import { BrandController } from './controllers/brand/brand.controller';
import { CategoryController } from './controllers/category/category.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { OrderController } from './controllers/order/order.controller';
import { ProductController } from './controllers/product/product.controller';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Customer, Order, Product]),
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env', // con esto se hace diferencia en los archivos de environment
      load: [config], // con esto se setean las variables que se pueden tomar y solamente estas, así no permitiendo errores humanos
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        PG_USER: Joi.string().required(),
        PG_HOST: Joi.string().required(),
        PG_DB: Joi.string().required(),
        PG_PASS: Joi.string().required(),
        PG_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    DatabaseModule,
  ],
  controllers: [
    AppController,
    BrandController,
    CategoryController,
    CustomerController,
    OrderController,
    ProductController,
    UserController,
  ],
  providers: [
    AppService,
    /*{
      provide: 'client',
      useValue: client,
    },*/
    {
      // el useFactory se utiliza comunmente para establecer conexión a algo externo, no para hacer peticiones directamente
      provide: 'todosLast', // from: jsonplaceholder.typicode.com
      useFactory: async (httpService: HttpService) => {
        const todos = await lastValueFrom(
          httpService.get('https://jsonplaceholder.typicode.com/todos'),
        );
        return todos.data; // axios retorna en .data
      },
      inject: [HttpService],
    },
    {
      provide: 'todosFirst', // from: jsonplaceholder.typicode.com
      useFactory: async (httpService: HttpService) => {
        const todos = await firstValueFrom(
          // devuelve lo mismo q last debido a q es un json el cual es un array por lo tanto el primer valor q trae es ese array completito
          httpService.get('https://jsonplaceholder.typicode.com/todos'),
        );
        return todos.data; // axios retorna en .data
      },
      inject: [HttpService],
    },
    BrandService,
    CategoryService,
    CustomerService,
    OrderService,
    ProductService,
    UserService,
  ],
  /*exports: [
    BrandService,
    CategoryService,
    CustomerService,
    OrderService,
    ProductService,
    UserService,
  ],*/
})
export class AppModule {}
