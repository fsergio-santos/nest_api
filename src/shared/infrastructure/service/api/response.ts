import { Request } from 'express';
import { ApiResponse, ErrorResponse, MessageResponse, SuccessResponse } from './api.response';

export const RESPONSE_SERVICE = 'RESPONSE_SERVICE';

export interface ResponseInterface {
  success<T>(message: string, data?: T): SuccessResponse<T>;
  error(message: string, code: string, details?: any): ErrorResponse;
  message(message: string, code?: string, statusCode?: number): MessageResponse;
  withRequest<T>(response: ApiResponse<T>, req: Request): ApiResponse<T>;
  created<T>(message: string, data?: T): SuccessResponse<T>;
  updated<T>(message: string, data?: T): SuccessResponse<T>;
  deleted<T>(message: string): SuccessResponse<T>;
  retrieved<T>(data: T, message: string): SuccessResponse<T>;
  notFound(message: string, code: string): ErrorResponse;
  unauthorized(message: string, code: string): ErrorResponse;
  forbidden(message: string, code: string): ErrorResponse;
  badRequest(message: string, code: string): ErrorResponse;
  validationError(message: string, code: string): ErrorResponse;
  internalError(message: string, code: string): ErrorResponse;
}
