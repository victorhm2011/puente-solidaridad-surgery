import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipUndefinedProperties: true,
      skipNullProperties: true,
      skipMissingProperties: true,
      transform: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
