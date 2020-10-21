import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
    maxAge: 3600
  });
  await app.listen(3000);
}
bootstrap();