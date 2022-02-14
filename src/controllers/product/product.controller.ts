import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  //ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductService } from 'src/services/product/product.service';
import { ParseIntPipe } from 'src/shared/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';

import responseModule from 'src/middlewares/response.middleware';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  //getProducts(@Query('name') name = 'N/A', @Query('price') price = 0) {
  @Get('/all') // /product/all?name=mesa&price=999
  @ApiOperation({ summary: 'Get all products' })
  getProducts() {
    return this.productService.findAll();
    const result = this.productService.findAll();
    if (result) {
      return responseModule.success(result, 200);
    } else {
      return responseModule.error('Error searching Products', 500);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a product by id', description: 'asd' })
  // ejemplo de uso de ParseIntPipe
  getProduct(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.findOne(productId);
    const result = this.productService.findOne(productId);
    if (result) {
      return responseModule.success(result, 200);
    } else {
      return responseModule.error('Error searching the Product', 500);
    }
    //console.log('\u001b[' + 31 + 'm' + error + '\u001b[0m');
  }

  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
    const result = this.productService.create(payload);
    if (result) {
      return responseModule.success(result, 201);
    } else {
      // echar ojo a class-validator para responder bien
      return responseModule.error('Error creating a Product', 500);
    }
  }

  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productService.update(id, payload);
    const result = this.productService.update(id, payload);
    if (result) {
      return responseModule.success(result, 200);
    } else {
      return responseModule.error('Error updating a Product', 500);
    }
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
    const result = this.productService.delete(id);
    if (result) {
      return responseModule.success(result, 200);
    } else {
      return responseModule.error('Error deleting a Product', 500);
    }
  }
}

// para validar body o params:
// npm i class-validator class-transformer
// ver imagenes en chat con Paolo en teams (08/02/2022)

// así se llaman los params para obtener un objeto con las variables necesarias
/*getProduct(@Param() params: any) {
  return 'con /sas/' + params.id;
}*/
/*response.status(HttpStatus.OK).send({
  error: '',
  message: 'Producto ' + productId,
  status: 200,
});*/
/*return {
  error: '',
  message: 'Producto ' + productId,
  status: 200,
};*/
