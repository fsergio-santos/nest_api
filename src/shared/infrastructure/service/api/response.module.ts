import { Global, Module } from '@nestjs/common';
import { RESPONSE_SERVICE } from './response';
import { ResponseService } from './response.service';

@Global()
@Module({
  providers: [
    {
      provide: RESPONSE_SERVICE,
      useClass: ResponseService,
    },
  ],
  exports: [RESPONSE_SERVICE],
})
export class ResponseModule {}
