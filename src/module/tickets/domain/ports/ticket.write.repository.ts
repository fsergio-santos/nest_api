import { TicketEntity } from '../entities/tickets.entity';
import { Status } from '../value-objects/status.value.objects';

export const TICKET_WRITE_REPOSITORY = 'TICKET_WRITE_REPOSITORY';

export interface TicketWriteRepository {
  createTicket(ticket: TicketEntity): Promise<TicketEntity>;
  updateTicket(ticket: TicketEntity): Promise<TicketEntity>;
  updateTicketStatus(id: string, status: Status): Promise<void>;
  deleteTicket(id: string): Promise<void>;
}
