import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  //constructor(@Inject('client') private readonly client) {}
  constructor(
    @Inject('PG') private readonly clientPg: Client,
    @Inject('todosLast') private readonly todosLast,
    @Inject('todosFirst') private readonly todosFirst,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}
  async getHello(): Promise<string> {
    const nodeEnv = this.configService.environment.node_env;
    const port = this.configService.environment.port;
    console.log(nodeEnv, port);
    //console.log(this.todosFirst[0].title);
    return `Hello World!, ${this.todosLast[0].title} ${nodeEnv}`;
  }

  getProducts(): any {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM product', (err, res) => {
        if (err) reject(err);
        else resolve(res.rows); // imprime los productos
      });
    });
  }
}
