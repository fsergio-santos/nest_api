import { Controller, Delete, HttpCode, HttpStatus, Inject, Param } from '@nestjs/common';
import { ResponseMessage } from '../../../../shared/infrastructure/decorators/response.message.decorators';
import { DELETE_TICKET_USE_CASE, DeleteTikectUseCase } from '../../application/use-case/write/delete.ticlet.usecase';

@Controller('ticket')
export class DeleteTicketController {
  constructor(
    @Inject(DELETE_TICKET_USE_CASE)
    private readonly deleteTicketUseCase: DeleteTikectUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @ResponseMessage('O Chamado foi excluído com sucesso')
  async createTicket(@Param('id') id: string): Promise<void> {
    return this.deleteTicketUseCase.execute(id);
  }
}
