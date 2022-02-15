// la gracia de esto es q de aca se pueda obtener lo q sea donde sea
// otra gracia es q puedes agarrar los servicios de todos lados para que no haya problemas de doble importacion
// ej: user.module importa product.service y product.module importa user.service (ERROR DE DOBLE IMPORTACION)
import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigType } from '@nestjs/config';
import config from '../config';

/*
  console.log(process.env.PG_USER);
  const client = new Client({
    user: process.env['PG_USER'],
    host: process.env['PG_HOST'],
    database: process.env['PG_DB'],
    password: process.env['PG_PASS'],
    port: parseInt(process.env['PG_PORT']),
  });
*/

// EJEMPLO DE QUERY
/*client.query('SELECT * FROM product', (err, res) => {
  if (err) console.log(err);
  else console.log(res.rows); // imprime los productos
});*/

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { pg_user, pg_host, pg_db, pg_pass, pg_port } =
          configService.postgres;
        return {
          type: 'postgres',
          host: pg_host,
          port: parseInt(pg_port),
          username: pg_user,
          password: pg_pass,
          database: pg_db,
          synchronize: true, // ojo aca: esto no debe estar en prod, esto genera error pq trata de crear nuevamente las tablas
          autoLoadEntities: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: '123456789',
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { pg_user, pg_host, pg_db, pg_pass, pg_port } =
          configService.postgres;
        const client = new Client({
          user: pg_user,
          host: pg_host,
          database: pg_db,
          password: pg_pass,
          port: parseInt(pg_port),
        });
        client.connect().then(() => console.log('Connected to Postgres'));
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
