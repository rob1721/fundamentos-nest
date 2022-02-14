import { Module } from '@nestjs/common';
import { HttpService, HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { firstValueFrom, lastValueFrom } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexModule } from './index.module';

import { DatabaseModule } from './database/database.module';

import { environments } from './environment';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env', // con esto se hace diferencia en los archivos de environment
      load: [config], // con esto se setean las variables que se pueden tomar y solamente estas, así no permitiendo errores humanos
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        PG_USER: Joi.string().required(),
        PG_HOST: Joi.string().required(),
        PG_DB: Joi.string().required(),
        PG_PASS: Joi.string().required(),
        PG_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    IndexModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*{
      provide: 'client',
      useValue: client,
    },*/
    {
      // el useFactory se utiliza comunmente para establecer conexión a algo externo, no para hacer peticiones directamente
      provide: 'todosLast', // from: jsonplaceholder.typicode.com
      useFactory: async (httpService: HttpService) => {
        const todos = await lastValueFrom(
          httpService.get('https://jsonplaceholder.typicode.com/todos'),
        );
        return todos.data; // axios retorna en .data
      },
      inject: [HttpService],
    },
    {
      provide: 'todosFirst', // from: jsonplaceholder.typicode.com
      useFactory: async (httpService: HttpService) => {
        const todos = await firstValueFrom(
          // devuelve lo mismo q last debido a q es un json el cual es un array por lo tanto el primer valor q trae es ese array completito
          httpService.get('https://jsonplaceholder.typicode.com/todos'),
        );
        return todos.data; // axios retorna en .data
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
