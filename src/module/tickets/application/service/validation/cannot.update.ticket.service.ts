import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { TicketRequest } from '../../../presentation/dto/ticket/ticket.request';
import { RulesTicketUseCase } from '../../use-case/write/rules.ticket.usecase';

@Injectable()
export class CanNotTicketUpdateService implements RulesTicketUseCase {
  validate(ticketEntity: TicketEntity, ticketRequest: TicketRequest): void {
    const isChangingContent = ticketEntity.title || ticketRequest.description || ticketRequest.prioridade;

    if (ticketEntity.status.isConcluido() && isChangingContent) {
      throw new BadRequestException('Não é permitido alterar dados de um ticket que já está concluído.');
    }
  }
}
