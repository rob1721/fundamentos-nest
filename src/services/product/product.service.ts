import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/interfaces/product.entity';

// importando la conexión a pg para hacer manejo y wea
import { Client } from 'pg';

import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { Category } from 'src/interfaces/category.entity';

@Injectable()
export class ProductService {
  constructor(
    // esto es dependencia circular, por lo general...evitar
    /*@Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,*/
    @Inject('PG') private readonly clientPg: Client,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll() {
    return this.productRepo.find({
      relations: ['categories'],
    });
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
  }

  async create(payload: CreateProductDto) {
    // payload debe ser any debido a que no nos entregan el id
    const newProduct = this.productRepo.create(payload); // crea un producto
    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        payload.categoriesIds,
      );
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct); // guarda el producto
  }

  // para hacer manejo mas global basta con update directo
  async update(id: number, payload: UpdateProductDto) {
    const productToUpdate: Partial<Product> = payload;
    const product = await this.findOne(id);
    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        payload.categoriesIds,
      );
      productToUpdate.categories = categories;
    }
    this.productRepo.merge(product, productToUpdate);
    this.productRepo.merge(product, { updatedAt: new Date() });
    return this.productRepo.save(product);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne(categoryId); // buena práctica agregar validación de que exista la categoría
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async deleteCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (cat) => cat.id !== categoryId,
    );
    console.log(product);
    return this.productRepo.save(product);
  }

  test() {
    return new Promise((resolve, reject) => {
      console.log('entro a findAll');
      this.clientPg.query(`SELECT * FROM product`, (err, res) => {
        if (err) reject(err);
        else resolve(res.rows); // imprime los productos
      });
    });
  }
}
