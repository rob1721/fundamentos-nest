import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CategoryService } from 'src/services/category/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from 'src/shared/parse-int.pipe';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/all')
  @ApiOperation({ summary: 'Get all categories' })
  getAllCategories() {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a category by id' })
  getCategory(@Param('id', ParseIntPipe) cateogryId: number) {
    return this.categoryService.findOne(cateogryId);
  }

  @Post()
  createCategory(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Put('/:id')
  updateCategory(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
    return this.categoryService.update(id, payload);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
