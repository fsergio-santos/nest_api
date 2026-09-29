import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ResponseMessage } from '../../../../shared/infrastructure/decorators/response.message.decorators';
import { CREATE_TICKET_USE_CASE, CreateTicketUseCase } from '../../application/use-case/write/create.ticket.usecase';
import { TicketRequest } from '../dto/ticket/ticket.request';
import { TicketResponse } from '../dto/ticket/ticket.response';
import { TicketMapper } from '../mappers/ticket.mapper';

@Controller('ticket')
export class CreateTicketController {
  constructor(
    @Inject(CREATE_TICKET_USE_CASE)
    private readonly createTicketUseCase: CreateTicketUseCase,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ResponseMessage('O Chamado foi criado com sucesso ')
  async createTicket(@Body() ticketRequest: TicketRequest): Promise<TicketResponse> {
    const ticketEntity = await this.createTicketUseCase.execute(ticketRequest);
    return TicketMapper.toTicketResponseFromTicketEntity(ticketEntity);
  }
}
