import { Inject, Injectable } from '@nestjs/common';
import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { TICKET_READ_REPOSITORY, TicketReadRepository } from '../../../domain/ports/ticket.read.repository';
import { FindTicketAllUseCase } from '../../use-case/read/find.ticket.all.usecase';

@Injectable()
export class FindTicketAllService implements FindTicketAllUseCase {
  constructor(
    @Inject(TICKET_READ_REPOSITORY)
    private readonly ticketReadRepository: TicketReadRepository,
  ) {}
  async execute(): Promise<TicketEntity[]> {
    return await this.ticketReadRepository.findTicketAll();
  }
}
