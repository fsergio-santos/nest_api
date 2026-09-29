import { Controller, Get, HttpCode, HttpStatus, Inject, Query } from '@nestjs/common';
import { Page } from '../../../../shared/domain/pagination/page';
import { ResponseMessage } from '../../../../shared/infrastructure/decorators/response.message.decorators';
import {
  FIND_TICKET_BY_PAGINATE_USE_CASE,
  FindTicketByPaginateUseCase,
} from '../../application/use-case/read/find.ticket.by.paginate';
import { PaginationQueryRequest } from '../dto/pagination/pagination.query.request';
import { TicketResponse } from '../dto/ticket/ticket.response';
import { TicketMapper } from '../mappers/ticket.mapper';

@Controller('ticket')
export class FindTicketByPaginationController {
  constructor(
    @Inject(FIND_TICKET_BY_PAGINATE_USE_CASE)
    private readonly findTicketByPaginateUseCase: FindTicketByPaginateUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ResponseMessage('O relatório de Chamados foi criado com sucesso')
  async findTicketByPagination(@Query() query: PaginationQueryRequest): Promise<Page<TicketResponse>> {
    const pageEntity = await this.findTicketByPaginateUseCase.execute(query);
    return pageEntity.map((entity) => TicketMapper.toTicketResponseFromTicketEntity(entity));
  }
}
