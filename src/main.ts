import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // for adding prefix after base url
  app.setGlobalPrefix('api/v1');
  // for accessing .env globally
  const configService = app.get(ConfigService);
  // for enabling class-validator globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, }),);
  // for enabling CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(configService.get('PORT') || 3179);
}
bootstrap();
