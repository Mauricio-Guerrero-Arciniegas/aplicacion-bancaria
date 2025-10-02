import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Configurar CORS dinámicamente
  const allowedOrigins = (configService.get<string>('ALLOWED_ORIGINS') ?? '')
    .split(',')
    .map(origin => origin.trim());

  app.enableCors({
    origin: allowedOrigins,
  });

  const port = parseInt(configService.get<string>('PORT') ?? '3000', 10);
  await app.listen(port);
  console.log(`App listening on port ${port}`);
}
bootstrap();