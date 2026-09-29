import { Global, Module } from '@nestjs/common';
import { SystemLoggerService } from './system.logger.service';

@Global()
@Module({
  providers: [SystemLoggerService],
  exports: [SystemLoggerService],
})
export class LoggerModule {}
