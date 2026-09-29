import { Page } from '../../../../../shared/domain/pagination/page';
import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { PaginationQueryRequest } from '../../../presentation/dto/pagination/pagination.query.request';

export const FIND_TICKET_BY_PAGINATE_USE_CASE = 'FIND_TICKET_BY_PAGINATE_USE_CASE';

export interface FindTicketByPaginateUseCase {
  execute(query: PaginationQueryRequest): Promise<Page<TicketEntity>>;
}
