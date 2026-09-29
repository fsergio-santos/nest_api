import { TicketEntity } from '../../../domain/entities/tickets.entity';

export const FIND_TICKET_ALL_USE_CASE = 'FIND_TICKET_ALL_USE_CASE';

export interface FindTicketAllUseCase {
  execute(): Promise<TicketEntity[]>;
}
