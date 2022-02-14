import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const result = await this.appService.getHello();
    console.log(result);
    return await this.appService.getHello();
  }

  // nuevos endpoints
  @Get('/test')
  newEndpoint() {
    return 'This is a new endpoint!';
  }

  @Get('/test/getproducts')
  getProducts() {
    return this.appService.getProducts();
  }
}
