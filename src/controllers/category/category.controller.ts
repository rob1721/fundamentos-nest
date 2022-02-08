import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  @Get('/all')
  getAllCategories() {
    return 'all categories';
  }

  @Get('/:id/product/:productId')
  getCategory(@Param('id') catId: string, @Param('productId') prodId: string) {
    return 'product ' + prodId + ' from category ' + catId;
  }

  @Post()
  createCategory(@Body() payload: any) {
    return {
      error: '',
      message: payload,
      status: 201,
    };
  }
}
