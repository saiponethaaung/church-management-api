import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { InputValidationPipe } from './pipes/input-validation.pipe';
import { GlobalExceptionHandlerFilter } from './filters/global-exception-handler/global-exception-handler.filter';
import { ResponseFormatInterceptor } from './interceptors/response-format/response-format.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
    },
  });

  // Version
  app.enableVersioning({
    prefix: 'v',
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  // Increase the maximum request body size
  app.useBodyParser('json', { limit: '2mb' });

  // Enable input/dto validation
  app.useGlobalPipes(new InputValidationPipe());

  // // Global Exception handler
  app.useGlobalFilters(new GlobalExceptionHandlerFilter());

  // // Global response formatter(interceptor)
  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  // Set global prefix
  app.setGlobalPrefix('api');

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
