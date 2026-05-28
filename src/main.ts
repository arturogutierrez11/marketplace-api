import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './common/swagger/swagger.setup';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  setupSwagger(app, 'Marketplace API', 'API para integración con marketplaces (Megatone, On city)', [
    'megatone',
    'oncity'
  ]);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
