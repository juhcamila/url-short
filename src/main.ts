import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocumentService } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, SwaggerDocumentService());
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
