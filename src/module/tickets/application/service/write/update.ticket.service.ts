import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { TICKET_READ_REPOSITORY, TicketReadRepository } from '../../../domain/ports/ticket.read.repository';
import { TICKET_WRITE_REPOSITORY, TicketWriteRepository } from '../../../domain/ports/ticket.write.repository';
import { TicketRequest } from '../../../presentation/dto/ticket/ticket.request';
import { RulesTicketUseCase, TICKET_RULES_USE_CASE } from '../../use-case/write/rules.ticket.usecase';
import { UpdateTicketUseCase } from '../../use-case/write/update.ticket.usecase';

@Injectable()
export class UpdateTicketService implements UpdateTicketUseCase {
  constructor(
    @Inject(TICKET_WRITE_REPOSITORY)
    private readonly ticketWriteRepository: TicketWriteRepository,
    @Inject(TICKET_READ_REPOSITORY)
    private readonly ticketReadRepository: TicketReadRepository,
    @Inject(TICKET_RULES_USE_CASE)
    private readonly rules: RulesTicketUseCase[],
  ) {}
  async execute(id: string, ticketRequest: TicketRequest): Promise<TicketEntity> {
    let ticketEntity = await this.ticketReadRepository.findTicketById(id);

    if (!ticketEntity) {
      throw new NotFoundException(`Ticket com id "${id}" não encontrado.`);
    }

    for (const rule of this.rules) {
      rule.validate(ticketEntity, ticketRequest);
    }

    if (ticketRequest.title || ticketRequest.description) {
      ticketEntity.updateTicket(ticketRequest.title, ticketRequest.description);
    }

    if (ticketRequest.prioridade) {
      ticketEntity.changePrioridadeTicket(ticketRequest.prioridade);
    }

    if (ticketRequest.status) {
      ticketEntity.changeStatus(ticketRequest.status);
    }

    ticketEntity = await this.ticketWriteRepository.updateTicket(ticketEntity);

    return ticketEntity;
  }
}
