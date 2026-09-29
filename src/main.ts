import {
  ClassSerializerInterceptor,
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app/app.module';
import { APP_PORT } from './shared/infrastructure/constants/constants';
import { GlobalExceptionFilter } from './shared/infrastructure/exceptions/global.exceptions.filter';
import { ResponseInterceptor } from './shared/infrastructure/interceptors/response.interceptors';
import { SystemLoggerService } from './shared/infrastructure/service/logger/system.logger.service';

function formatValidationErrors(errors: ValidationError[]): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const error of errors) {
    // Se o campo atual tiver restrições violadas
    if (error.constraints) {
      result[error.property] = Object.values(error.constraints);
    }

    // Se houver objetos aninhados com erro (nested DTOs)
    if (error.children && error.children.length > 0) {
      const childErrors = formatValidationErrors(error.children);
      for (const [childKey, childMsgs] of Object.entries(childErrors)) {
        result[`${error.property}.${childKey}`] = childMsgs;
      }
    }
  }

  return result;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = formatValidationErrors(errors);

        return new UnprocessableEntityException({
          statusCode: 422,
          error: 'Bad Request',
          message: 'Falha na validação dos dados de entrada',
          errors: formattedErrors,
        });
      },
    }),
  );

  app.useGlobalInterceptors(
    new ResponseInterceptor(new Reflector()),
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
    credentials: false,
  });

  await app.listen(APP_PORT);

  const url = await app.getUrl();

  const customLogger = await app.resolve(SystemLoggerService);
  customLogger.setContext('Bootstrap');
  customLogger.log(`Aplicação Rodando no endereço : ${url}`);

  app.useLogger(customLogger);

  console.log('\n O servidor está rodando na porta ==>', APP_PORT);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
