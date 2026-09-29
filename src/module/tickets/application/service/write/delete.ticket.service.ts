import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TICKET_READ_REPOSITORY, TicketReadRepository } from '../../../domain/ports/ticket.read.repository';
import { TICKET_WRITE_REPOSITORY, TicketWriteRepository } from '../../../domain/ports/ticket.write.repository';
import { DeleteTikectUseCase } from '../../use-case/write/delete.ticlet.usecase';

@Injectable()
export class DeleteTicketService implements DeleteTikectUseCase {
  constructor(
    @Inject(TICKET_WRITE_REPOSITORY)
    private readonly ticketWriteRepository: TicketWriteRepository,
    @Inject(TICKET_READ_REPOSITORY)
    private readonly ticketReadRepository: TicketReadRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const ticketPrisma = await this.ticketReadRepository.findTicketById(id);
    if (!ticketPrisma) {
      throw new NotFoundException(`Ticket com ID "${id}" não encontrado.`);
    }

    await this.ticketWriteRepository.deleteTicket(id);
  }
}
