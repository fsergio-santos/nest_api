import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { Status } from '../../../domain/value-objects/status.value.objects';
import { TicketRequest } from '../../../presentation/dto/ticket/ticket.request';
import { RulesTicketUseCase } from '../../use-case/write/rules.ticket.usecase';

@Injectable()
export class ValidateStatusTicketService implements RulesTicketUseCase {
  validate(ticketEntity: TicketEntity, ticketRequest: TicketRequest): void {
    if (!ticketRequest.status) return;

    const nextStatus = Status.create(ticketRequest.status);

    if (!ticketEntity.status.canTransitionTo(nextStatus)) {
      throw new BadRequestException(
        `Transição ilegal: o ticket já está ${ticketEntity.status.value} e não pode ir para ${nextStatus.value}.`,
      );
    }
  }
}
