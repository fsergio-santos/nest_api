import { Controller, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ResponseMessage } from '../../../../shared/infrastructure/decorators/response.message.decorators';
import { CLOSE_TICKET_USE_CASE, CloseTikectUseCase } from '../../application/use-case/write/close.ticlet.usecase';

@Controller('ticket')
export class CloseTicketController {
  constructor(
    @Inject(CLOSE_TICKET_USE_CASE)
    private readonly closeTicketUseCase: CloseTikectUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post(':id')
  @ResponseMessage('O Chamado foi fechado com sucesso')
  async closeTicket(@Param('id') id: string): Promise<void> {
    await this.closeTicketUseCase.execute(id);
  }
}
