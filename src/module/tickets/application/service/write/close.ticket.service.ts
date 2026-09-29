import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TICKET_READ_REPOSITORY, TicketReadRepository } from '../../../domain/ports/ticket.read.repository';
import { TICKET_WRITE_REPOSITORY, TicketWriteRepository } from '../../../domain/ports/ticket.write.repository';
import { CloseTikectUseCase } from '../../use-case/write/close.ticlet.usecase';

@Injectable()
export class CloseTicketService implements CloseTikectUseCase {
  constructor(
    @Inject(TICKET_WRITE_REPOSITORY)
    private readonly ticketWriteRepository: TicketWriteRepository,
    @Inject(TICKET_READ_REPOSITORY)
    private readonly ticketReadRepository: TicketReadRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const ticketEntity = await this.ticketReadRepository.findTicketById(id);
    if (!ticketEntity) {
      throw new NotFoundException(`Ticket com ID "${id}" não encontrado.`);
    }

    try {
      ticketEntity.closeTicket();
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }

    await this.ticketWriteRepository.updateTicketStatus(id, ticketEntity.status);
  }
}
