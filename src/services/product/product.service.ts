import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/interfaces/product.entity';

import { CategoryService } from '../category/category.service';
import { OrderService } from '../order/order.service';

// importando la conexión a pg para hacer manejo y wea
import { Client } from 'pg';

import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    //private categoryService: CategoryService,
    //private orderService: OrderService,
    @Inject('PG') private readonly clientPg: Client,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return this.productRepo.find();
    /*return new Promise((resolve, reject) => {
      console.log('entro a findAll');
      this.clientPg.query('SELECT * FROM product', (err, res) => {
        if (err) reject(err);
        else resolve(res.rows); // imprime los productos
      });
    });*/
  }

  async findOne(id: number) {
    const prod = await this.productRepo.findOne(id);
    if (!prod) throw new NotFoundException(`Product #${id} not found`);
    return prod;
    /*return new Promise((resolve, reject) => {
      console.log('entro a findAll');
      this.clientPg.query(
        `SELECT * FROM product WHERE product.id = ${id}`,
        (err, res) => {
          if (err) reject(err);
          else resolve(res.rows); // imprime los productos
        },
      );
    });*/
  }

  async create(payload: CreateProductDto) {
    // payload debe ser any debido a que no nos entregan el id
    const newProduct = this.productRepo.create(payload); // crea un producto
    return this.productRepo.save(newProduct); // guarda el producto
  }

  // para hacer manejo mas global basta con update directo
  async update(id: number, payload: UpdateProductDto) {
    const productToUpdate: Partial<Product> = payload;
    const product = await this.findOne(id);
    this.productRepo.merge(product, productToUpdate);
    this.productRepo.merge(product, { updatedAt: new Date() });
    return this.productRepo.save(product);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }
}
