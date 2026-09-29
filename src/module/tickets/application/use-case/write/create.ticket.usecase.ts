import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { TicketRequest } from '../../../presentation/dto/ticket/ticket.request';

export const CREATE_TICKET_USE_CASE = 'CREATE_TICKET_USE_CASE';

export interface CreateTicketUseCase {
  execute(ticketRequest: TicketRequest): Promise<TicketEntity>;
}
