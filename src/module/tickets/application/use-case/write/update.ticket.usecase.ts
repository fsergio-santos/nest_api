import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { TicketRequest } from '../../../presentation/dto/ticket/ticket.request';

export const UPDATE_TICKET_USE_CASE = 'UPDATE_TICKET_USE_CASE';

export interface UpdateTicketUseCase {
  execute(id: string, ticketRequest: TicketRequest): Promise<TicketEntity>;
}
