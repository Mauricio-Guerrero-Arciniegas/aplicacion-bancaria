import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS global
  app.enableCors({
    origin: 'http://localhost:3001', // frontend
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true,
  });

  // Manejar preflight OPTIONS con tipado
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      return res.status(200).end();
    }
    next();
  });

  await app.listen(3000);
  console.log('Backend corriendo en http://localhost:3000');
}
bootstrap();