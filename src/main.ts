import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // HTTP app
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Flowers api')
    .setDescription('The flowers API description')
    .setVersion('1.0')
    .addTag('flowers')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 4200);

  // TCP microservice (same module, now includes MicroserviceModule)
  // const microserviceApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: 'localhost',
  //     port: 8877,
  //   },
  // });

  //await microserviceApp.listen();
}
bootstrap();
