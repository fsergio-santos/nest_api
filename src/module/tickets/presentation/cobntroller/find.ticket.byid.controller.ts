import { Controller, Get, HttpCode, HttpStatus, Inject, Param } from '@nestjs/common';
import { ResponseMessage } from '../../../../shared/infrastructure/decorators/response.message.decorators';
import {
  FIND_TICKET_BYID_USE_CASE,
  FindTicketByIdUseCase,
} from '../../application/use-case/read/find.ticket.byid.usecase';
import { TicketResponse } from '../dto/ticket/ticket.response';
import { TicketMapper } from '../mappers/ticket.mapper';

@Controller('ticket')
export class FindTicketByIdController {
  constructor(
    @Inject(FIND_TICKET_BYID_USE_CASE)
    private readonly findTicketByIdUsecase: FindTicketByIdUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ResponseMessage('O Chamado foi localizado com sucesso')
  async findticketById(@Param('id') id: string): Promise<TicketResponse> {
    const ticketEntity = await this.findTicketByIdUsecase.execute(id);
    return TicketMapper.toTicketResponseFromTicketEntity(ticketEntity);
  }
}
