import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: {
      port: process.env.PORT,
      node_env: process.env.NODE_ENV,
    },
    postgres: {
      pg_user: process.env.PG_USER,
      pg_host: process.env.PG_HOST,
      pg_db: process.env.PG_DB,
      pg_pass: process.env.PG_PASS,
      pg_port: process.env.PG_PORT,
    },
  };
});
