import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MockServiceModule } from '@src/mock.module';
import mongoose from 'mongoose';

const mockServicePort = Number(process.env.MOCK_SERVICE_PORT);

async function bootstrap() {
  const app = await NestFactory.create(MockServiceModule);

  const config = new DocumentBuilder()
    .setTitle('Mock serivce API')
    .setDescription('Mock service api')
    .addTag('mock', 'Mock service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await mongoose.connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    { dbName: process.env.MONGO_DATABASE },
  );
  await app.listen(mockServicePort);
}
bootstrap();
