import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ResponseMessage } from '../../../../shared/infrastructure/decorators/response.message.decorators';
import {
  FIND_TICKET_ALL_USE_CASE,
  FindTicketAllUseCase,
} from '../../application/use-case/read/find.ticket.all.usecase';
import { TicketResponse } from '../dto/ticket/ticket.response';
import { TicketMapper } from '../mappers/ticket.mapper';

@Controller('ticket')
export class FindTicketAllController {
  constructor(
    @Inject(FIND_TICKET_ALL_USE_CASE)
    private readonly findTicketAllUsecase: FindTicketAllUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ResponseMessage('Lista de Chamados geradas com sucesso')
  async findticketById(): Promise<TicketResponse[]> {
    const ticketEntity = await this.findTicketAllUsecase.execute();
    return TicketMapper.toListTicketResponseFromListTicketEntity(ticketEntity);
  }
}
