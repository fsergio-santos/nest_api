import { Inject, Injectable } from '@nestjs/common';
import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { TICKET_WRITE_REPOSITORY, TicketWriteRepository } from '../../../domain/ports/ticket.write.repository';
import { TicketRequest } from '../../../presentation/dto/ticket/ticket.request';
import { TicketMapper } from '../../../presentation/mappers/ticket.mapper';
import { CreateTicketUseCase } from '../../use-case/write/create.ticket.usecase';

@Injectable()
export class CreateTicketService implements CreateTicketUseCase {
  constructor(
    @Inject(TICKET_WRITE_REPOSITORY)
    private readonly ticketWriteRepository: TicketWriteRepository,
  ) {}
  async execute(ticketRequest: TicketRequest): Promise<TicketEntity> {
    let ticketEntity = TicketMapper.toTicketEntityFromRequest(ticketRequest);
    ticketEntity = await this.ticketWriteRepository.createTicket(ticketEntity);
    return ticketEntity;
  }
}
