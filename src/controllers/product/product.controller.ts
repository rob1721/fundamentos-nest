import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProductService } from 'src/services/product/product.service';

import responseModule from 'src/modules/response.module';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  //getProducts(@Query('name') name = 'N/A', @Query('price') price = 0) {
  @Get('/all') // /product/all?name=mesa&price=999
  getProducts() {
    try {
      const result = this.productService.findAll();
      if (result) {
        return responseModule.success(result, 200);
      } else {
        return responseModule.error('Not found', 400);
      }
    } catch (error) {
      console.log(error);
      return responseModule.error(error);
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id') productId: string) {
    try {
      const result = this.productService.findOne(productId);
      if (result) {
        return responseModule.success(result, 200);
      } else {
        return responseModule.error('Product Not found', 400);
      }
    } catch (error) {
      console.log(error);
      return responseModule.error(error, 400);
    }
  }

  @Post()
  createProduct(@Body() payload: any) {
    try {
      const result = this.productService.create(payload);
      if (result) {
        return responseModule.success(result, 201);
      } else {
        // echar ojo a class-validator para responder bien
        return responseModule.error('Product Not created', 400);
      }
    } catch (error) {
      console.log(error);
      return responseModule.error(error);
    }
  }

  @Put('/:id')
  updateProduct(@Param('id') id: string, @Body() payload: any) {
    try {
      const result = this.productService.update(id, payload);
      if (result) {
        return responseModule.success(result, 200);
      } else {
        return responseModule.error('Product Not found', 400);
      }
    } catch (error) {
      console.log(error);
      return responseModule.error(error);
    }
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    try {
      const result = this.productService.delete(id);
      if (result) {
        return responseModule.success(result, 200);
      } else {
        return responseModule.error('Product Not found', 400);
      }
    } catch (error) {
      console.log(error);
      return responseModule.error(error);
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
