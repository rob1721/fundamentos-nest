import { Injectable } from '@nestjs/common';
import { Product } from 'src/interfaces/product.interface';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: 10,
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      image: 'image2.jpg',
      stock: 20,
    },
  ];
  private counterId = this.products.length;

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw 'Product not found';
    }
    return product;
  }

  create(payload: any) {
    // payload debe ser any debido a que no nos entregan el id
    console.log(this.counterId);
    this.counterId = this.counterId + 1;
    console.log(this.counterId);
    const newProduct: Product = {
      id: this.counterId.toString(),
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, payload: any) {
    const product = this.findOne(id);
    if (!product) {
      return null;
    }
    Object.assign(product, payload);
    /*
      this.products[this.products.indexOf(product)] = {
        ...product,
        ...payload,
      };
    */
    return product;
  }

  delete(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return null;
    }
    this.products.splice(this.products.indexOf(product), 1);
    return product;
  }
}
