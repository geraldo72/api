import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidatorOptions } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(parseInt(process.env.PORT, 10));
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();