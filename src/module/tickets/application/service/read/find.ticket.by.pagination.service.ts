import { Inject, Injectable } from '@nestjs/common';
import { Page } from '../../../../../shared/domain/pagination/page';
import { SystemLoggerService } from '../../../../../shared/infrastructure/service/logger/system.logger.service';
import { TicketEntity } from '../../../domain/entities/tickets.entity';
import { TICKET_READ_REPOSITORY, TicketReadRepository } from '../../../domain/ports/ticket.read.repository';
import { PaginationQueryRequest } from '../../../presentation/dto/pagination/pagination.query.request';
import { FindTicketByPaginateUseCase } from '../../use-case/read/find.ticket.by.paginate';

@Injectable()
export class FindTicketByPaginationService implements FindTicketByPaginateUseCase {
  constructor(
    private readonly logger: SystemLoggerService,
    @Inject(TICKET_READ_REPOSITORY)
    private readonly ticketReadRepository: TicketReadRepository,
  ) {
    this.logger.setContext(FindTicketByPaginationService.name);
  }
  async execute(query: PaginationQueryRequest): Promise<Page<TicketEntity>> {
    this.logger.log('Inciando Consulta dos tickets com paginação ');
    const allowedSortFields = ['title', 'createdAt', 'status'];
    const pageable = query.toPageable(allowedSortFields);
    try {
      const page = await this.ticketReadRepository.findTicketByPaginate(pageable, query.search);
      return page;
    } catch (error: any) {
      this.logger.error(`Erro no processamento da consulta com paginação ${error.message}`);
      throw error;
    }
  }
}
