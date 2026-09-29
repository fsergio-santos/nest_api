import { Module } from '@nestjs/common';
import { TicketsModule } from '../module/tickets/ticket.module';
import { PrismaModule } from '../shared/infrastructure/database/prisma/prisma.module';
import { ResponseModule } from '../shared/infrastructure/service/api/response.module';
import { LoggerModule } from '../shared/infrastructure/service/logger/logger.module';

@Module({
  imports: [TicketsModule, PrismaModule, ResponseModule, LoggerModule],
  providers: [],
})
export class AppModule {}
