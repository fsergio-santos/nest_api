import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { Prioridade } from '../../../domain/value-objects/prioridade.value.objects';
import { TicketRequest } from '../../../presentation/dto/ticket/ticket.request';
import { RulesTicketUseCase } from '../../use-case/write/rules.ticket.usecase';

@Injectable()
export class UpdatePrioridadeTicketService implements RulesTicketUseCase {
  validate(ticketEntity: TicketEntity, ticketRequest: TicketRequest): void {
    if (!ticketRequest.prioridade) return;

    const requestedPriority = Prioridade.create(ticketRequest.prioridade);

    if (requestedPriority.isUrgent() && !ticketEntity.prioridade.isUrgent() && !ticketRequest.justificativa) {
      throw new BadRequestException('Escalonar um ticket para prioridade ALTA exige o envio de uma justificativa');
    }
  }
}
