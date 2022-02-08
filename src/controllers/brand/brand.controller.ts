import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('brand')
export class BrandController {
  @Get('/all')
  getBrands() {
    return 'all brands';
  }

  @Get('/:id')
  getBrand(@Param('id') brandId: string) {
    return 'con /sas/' + brandId;
  }

  @Post()
  createBrand(@Body() payload: any) {
    return {
      error: '',
      message: payload,
      status: 201,
    };
  }
}
