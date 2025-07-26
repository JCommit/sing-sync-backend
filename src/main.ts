// src/main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  ValidationPipe,
  ClassSerializerInterceptor,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const isProd = config.get<string>('NODE_ENV') === 'production';

  // Security & Performance
  app.use(helmet());
  app.use(
    compression({
      level: isProd ? 6 : 0,
      threshold: 1024,
    }),
  );

  // CORS
  const origins = config.get<string>('CORS_ORIGINS', '*').split(',');
  app.enableCors({
    origin: isProd ? origins : '*',
    methods: config.get<string>(
      'CORS_METHODS',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    ),
    allowedHeaders: config.get<string>(
      'CORS_HEADERS',
      'Content-Type, Authorization',
    ),
    credentials: config.get<boolean>('CORS_CREDENTIALS', false),
  });

  // API Prefix & Versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Exception Filter & Logging Interceptor
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
  );

  // Swagger / OpenAPI
  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get<string>('SWAGGER_TITLE', 'Sing Sync API'))
    .setDescription(
      config.get<string>(
        'SWAGGER_DESCRIPTION',
        'API documentation for Sing Sync application',
      ),
    )
    .setVersion(config.get<string>('SWAGGER_VERSION', '1.0'))
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .addServer(
      config.get<string>('SWAGGER_SERVER_URL', 'http://localhost:3000'),
      'Local server',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    deepScanRoutes: true,
    operationIdFactory: (ctrl, method) => `${ctrl}_${method}`,
  });
  SwaggerModule.setup(
    config.get<string>('SWAGGER_PATH', 'api/docs'),
    app,
    document,
    {
      swaggerOptions: { persistAuthorization: true },
    },
  );

  // Graceful shutdown
  app.enableShutdownHooks();

  // Start
  const port = config.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`🚀 Application running at ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
  process.exit(1);
});
