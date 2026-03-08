import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { InputValidationPipe } from './pipes/input-validation.pipe';
import { GlobalExceptionHandlerFilter } from './filters/global-exception-handler/global-exception-handler.filter';
import { ResponseFormatInterceptor } from './interceptors/response-format/response-format.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: 2 * 1024 * 1024 }),
  );
  
  
  app.enableCors();

  // Version
  app.enableVersioning({
    prefix: 'v',
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  // Enable input/dto validation
  app.useGlobalPipes(new InputValidationPipe());

  // // Global Exception handler
  app.useGlobalFilters(new GlobalExceptionHandlerFilter());

  // // Global response formatter(interceptor)
  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  // Set global prefix
  app.setGlobalPrefix('api');

  await app.register(fastifyCookie, {
    secret: 'my-secret', // Optional, if you want signed cookies
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('The url shortener API description')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/swagger', app, documentFactory);

  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3630;

  await app.listen(PORT).then(() => {
    console.log(`🚀 Application running at http://localhost:${PORT}`);
  });
}
bootstrap();
