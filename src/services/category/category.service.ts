import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/interfaces/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';

import { ProductService } from 'src/services/product/product.service';

@Injectable()
export class CategoryService {
  constructor(
    private productService: ProductService,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne(id);
    if (!category) throw new NotFoundException(`Category #${id} not found`);
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(payload);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const categoryToUpdate: Partial<Category> = payload;
    const category = await this.findOne(id);
    this.categoryRepo.merge(category, categoryToUpdate);
    return this.categoryRepo.save(category);
  }

  delete(id: number) {
    return this.categoryRepo.delete(id);
  }
}
