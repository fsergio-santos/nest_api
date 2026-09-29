import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ApiResponse, ErrorResponse, MessageResponse, SuccessResponse } from './api.response';
import { ResponseInterface } from './response';

@Injectable()
export class ResponseService implements ResponseInterface {
  message(message: string, code?: string, statusCode?: number): MessageResponse {
    return new MessageResponse(message, code, statusCode);
  }

  withRequest<T>(response: ApiResponse<T>, req: Request): ApiResponse<T> {
    response.path = req.path;
    response.method = req.method;
    return response;
  }

  success<T>(message: string, data?: T): SuccessResponse<T> {
    return new SuccessResponse(message, data ?? undefined);
  }

  error(message: string, code: string, details?: any): ErrorResponse {
    return new ErrorResponse(message, code, details);
  }

  /*
   * Funções para ações de exito e sucesso na resposta
   */

  created<T>(message: string, data?: T): SuccessResponse<T> {
    return this.success(message, data);
  }

  updated<T>(message: string, data?: T): SuccessResponse<T> {
    return this.success(message, data);
  }

  deleted<T>(message: string): SuccessResponse<T> {
    return this.success(message);
  }

  retrieved<T>(data: T, message: string): SuccessResponse<T> {
    return this.success(message, data);
  }

  /*
   * Funções para tratamento de erros na resposta
   */

  notFound(message = 'Resource not found', code = 'NOT_FOUND'): ErrorResponse {
    return this.error(message, code);
  }

  unauthorized(message = 'Unauthorized access', code = 'AUTHENTICATION_ERROR'): ErrorResponse {
    return this.error(message, code);
  }

  forbidden(message = 'Access forbidden', code = 'AUTHORIZATION_ERROR'): ErrorResponse {
    return this.error(message, code);
  }

  badRequest(message = 'Bad request', code = 'BAD_REQUEST', details?: any): ErrorResponse {
    return this.error(message, code, details);
  }

  validationError(details: any, message = 'Validation failed'): ErrorResponse {
    return this.error(message, 'VALIDATION_ERROR', details);
  }

  internalError(message = 'Internal server error', code = 'INTERNAL_ERROR'): ErrorResponse {
    return this.error(message, code);
  }
}
