import { Page } from '../../../../shared/domain/pagination/page';
import { Pageable } from '../../../../shared/domain/pagination/pageable';
import { TicketEntity } from '../entities/tickets.entity';

export const TICKET_READ_REPOSITORY = 'TICKET_READ_REPOSITORY';

export type TicketFilter = string;

export interface TicketReadRepository {
  findTicketByPaginate(pageable: Pageable, filter?: string): Promise<Page<TicketEntity>>;
  findTicketAll(): Promise<TicketEntity[]>;
  findTicketById(id: string): Promise<TicketEntity | null>;
}
