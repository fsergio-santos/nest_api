import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SystemLoggerService } from '../../../../../shared/infrastructure/service/logger/system.logger.service';
import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { TICKET_READ_REPOSITORY, TicketReadRepository } from '../../../domain/ports/ticket.read.repository';
import { FindTicketByIdUseCase } from '../../use-case/read/find.ticket.byid.usecase';

@Injectable()
export class FindTicketByIdService implements FindTicketByIdUseCase {
  constructor(
    private readonly logger: SystemLoggerService,
    @Inject(TICKET_READ_REPOSITORY)
    private readonly ticketReadRepository: TicketReadRepository,
  ) {
    this.logger.setContext(FindTicketByIdService.name);
  }
  async execute(id: string): Promise<TicketEntity> {
    this.logger.log(`Realizando consulta do ticket por id = ${id}`);
    const ticketEntity = await this.ticketReadRepository.findTicketById(id);

    if (!ticketEntity) {
      this.logger.error(`Ticket com o id "${id}" não foi encontrado`);
      throw new NotFoundException(`Ticket com id "${id}" não encontrado.`);
    }

    return ticketEntity;
  }
}
