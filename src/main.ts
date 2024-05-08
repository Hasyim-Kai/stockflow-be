import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // for accessing .env globally
  const configService = app.get(ConfigService);
  // for enabling class-validator globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, }),);

  await app.listen(configService.get('PORT') || 3179);
}
bootstrap();
