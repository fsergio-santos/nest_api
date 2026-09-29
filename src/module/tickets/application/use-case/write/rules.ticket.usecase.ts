import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { TicketRequest } from '../../../presentation/dto/ticket/ticket.request';

export const TICKET_RULES_USE_CASE = 'TICKET_RULES_USE_CASE';

export interface RulesTicketUseCase {
  validate(ticket: TicketEntity, ticketRequest: TicketRequest): void;
}
