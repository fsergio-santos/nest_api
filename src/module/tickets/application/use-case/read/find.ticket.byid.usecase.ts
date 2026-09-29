import { TicketEntity } from '../../../domain/entities/tickets.entity';

export const FIND_TICKET_BYID_USE_CASE = 'FIND_TICKET_BYID_USE_CASE';

export interface FindTicketByIdUseCase {
  execute(id: string): Promise<TicketEntity>;
}
