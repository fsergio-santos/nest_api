import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { APP_NAME, NODE_ENV } from '../../constants/constants';

@Injectable({ scope: Scope.TRANSIENT })
export class SystemLoggerService implements LoggerService {
  private context?: string;
  private readonly appName = APP_NAME;
  private readonly isProduction = NODE_ENV === 'production';

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: string) {
    this.print('INFO', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.print('ERROR', message, context, trace);
  }

  warn(message: string, context?: string) {
    this.print('WARN', message, context);
  }

  debug(message: string, context?: string) {
    if (!this.isProduction) {
      this.print('DEBUG', message, context);
    }
  }

  private print(level: string, message: string, context?: string, trace?: string) {
    const ctx = context || this.context || 'Application';
    const timestamp = new Date().toISOString();

    if (this.isProduction) {
      console.log(
        JSON.stringify({
          app: this.appName,
          level,
          context: ctx,
          timestamp,
          message,
          ...(trace ? { trace } : {}),
        }),
      );
      return;
    }

    console.log(`[${this.appName}] ${timestamp} [${level.padEnd(5)}] [${ctx}] ${message}`);

    if (trace) {
      console.error(trace);
    }
  }
}
