export interface Link {
  href: string;
  method?: string;
}

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

export class SuccessResponse<T> implements ApiResponse<T> {
  message!: string;
  data?: T | undefined;
  statusCode?: number;
  code?: string;
  timestamp?: string | undefined;
  path?: string | undefined;
  method?: string | undefined;

  constructor(message: string, data?: T, code?: string, statusCode?: number, meta?: any) {
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
    this.code = code;
    this.statusCode = statusCode;
    if (meta) {
      this.path = meta.path;
      this.method = meta.method;
    }
  }
}

export class ErrorResponse implements ApiResponse {
  message: string;
  error: string | Record<string, string[]>;
  statusCode?: number;
  code?: string;
  timestamp?: string;
  path?: string;
  method?: string;

  constructor(
    message: string,
    error: string | Record<string, string[]>,
    code?: string,
    statusCode?: number,
    meta?: any,
  ) {
    this.message = message;
    this.error = error;
    this.timestamp = new Date().toISOString();
    this.code = code;
    this.statusCode = statusCode;
    if (meta) {
      this.path = meta.path;
      this.method = meta.method;
    }
  }
}

export class MessageResponse implements ApiResponse {
  message: string;
  timestamp?: string;
  path?: string;
  method?: string;
  code?: string;
  statusCode?: number;

  constructor(message: string, code?: string, statusCode?: number, meta?: any) {
    this.message = message;
    this.timestamp = new Date().toISOString();
    this.code = code;
    this.statusCode = statusCode;
    if (meta) {
      this.path = meta.path;
      this.method = meta.method;
    }
  }
}
