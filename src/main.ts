import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';

//import { CConfigService } from './environment/config.service';
// solamente a modo de prueba
//let _config: CConfigService;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignora las variables que no coinciden con el modelo
      forbidNonWhitelisted: true, // si no coincide con el modelo, lanza un error
    }),
  );

  // las configuraciones relacionadas a procesos, deben estar antes del listen del port
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('PLATZI STORE')
    .setVersion('1.0')
    //.addTag('cats') mas adelante
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env['PORT'] || 3000);
  console.log('Escuchando puerto ' + (process.env['PORT'] || 3000));
}
bootstrap();
