// src/shared/infrastructure/filters/global-exception.filter.ts

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { ConflictError } from '../../domain/error/conflict.error.domain';
import { EntityValidationError } from '../../domain/validators/entity.validator.error';

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  statusCode?: number;
  code?: string;
  error?: string | Record<string, string[]>;
  timestamp?: string;
  path?: string;
  method?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_SERVER_ERROR';
    let message = 'Internal server error';
    let errorDetail: string | Record<string, string[]> | undefined;

    // 1. Validação de Invariantes do Domínio (422)
    if (exception instanceof EntityValidationError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      code = 'UNPROCESSABLE_ENTITY';
      message = 'Falha na validação das regras de negócio da entidade';
      errorDetail = exception.error; // Mapa Record<string, string[]>
    }
    // 2. Erros HTTP do NestJS e Validações de DTO (400, 401, 403, etc.)
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      code = HttpStatus[status] ?? 'HTTP_EXCEPTION';
      const res = exception.getResponse();

      if (typeof res === 'object' && res !== null) {
        const resObj = res as Record<string, any>;
        message = resObj.message || exception.message;
        // Captura tanto o mapa do exceptionFactory customizado quanto o erro textual
        errorDetail = resObj.errors ?? resObj.error ?? code;
      } else {
        message = String(res);
        errorDetail = code;
      }
    }
    // 3. Regras de Negócio: Não Encontrado (404)
    else if (exception instanceof NotFoundError) {
      status = HttpStatus.NOT_FOUND;
      code = 'NOT_FOUND';
      message = exception.message;
      errorDetail = 'Resource Not Found';
    }
    // 4. Regras de Negócio: Conflito / Duplicação (409)
    else if (exception instanceof ConflictError) {
      status = HttpStatus.CONFLICT;
      code = 'CONFLICT';
      message = exception.message;
      errorDetail = 'Resource Conflict';
    }
    // 5. Falhas Não Tratadas / Erros de Infraestrutura (500)
    else if (exception instanceof Error) {
      this.logger.error(`[${request.method}] ${request.url} - ${exception.message}`, exception.stack);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      code = 'INTERNAL_SERVER_ERROR';
      message = process.env.NODE_ENV === 'production' ? 'Erro interno no servidor' : exception.message;
      errorDetail = exception.name;
    }

    const payload: ApiResponse<null> = {
      message,
      statusCode: status,
      code,
      error: errorDetail,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    response.status(status).json(payload);
  }
}
