import { Body, Controller, HttpCode, HttpStatus, Inject, Param, Put } from '@nestjs/common';
import { ResponseMessage } from '../../../../shared/infrastructure/decorators/response.message.decorators';
import { SystemLoggerService } from '../../../../shared/infrastructure/service/logger/system.logger.service';
import { UPDATE_TICKET_USE_CASE, UpdateTicketUseCase } from '../../application/use-case/write/update.ticket.usecase';
import { TicketRequest } from '../dto/ticket/ticket.request';
import { TicketResponse } from '../dto/ticket/ticket.response';
import { TicketMapper } from '../mappers/ticket.mapper';

@Controller('ticket')
export class UpdateTicketController {
  constructor(
    private readonly logger: SystemLoggerService,
    @Inject(UPDATE_TICKET_USE_CASE)
    private readonly updateTicketUseCase: UpdateTicketUseCase,
  ) {
    this.logger.setContext(UpdateTicketController.name);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ResponseMessage('O Chamado foi alterado com sucesso ')
  async updateTicket(@Param('id') id: string, @Body() ticketRequest: TicketRequest): Promise<TicketResponse> {
    this.logger.log(`Realizando consulta do chamado por id=${id}`);
    const ticketEntity = await this.updateTicketUseCase.execute(id, ticketRequest);
    return TicketMapper.toTicketResponseFromTicketEntity(ticketEntity);
  }
}
