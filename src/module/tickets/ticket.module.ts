import { Module } from '@nestjs/common';
import { FindTicketAllService } from './application/service/read/find.ticket.all.service';
import { FindTicketByPaginationService } from './application/service/read/find.ticket.by.pagination.service';
import { FindTicketByIdService } from './application/service/read/findbyid.ticket.service';
import { CanNotTicketUpdateService } from './application/service/validation/cannot.update.ticket.service';
import { UpdatePrioridadeTicketService } from './application/service/validation/update.prioridade.ticket.service';
import { ValidateStatusTicketService } from './application/service/validation/validate.status.ticket.service';
import { CloseTicketService } from './application/service/write/close.ticket.service';
import { CreateTicketService } from './application/service/write/create.ticket.service';
import { DeleteTicketService } from './application/service/write/delete.ticket.service';
import { UpdateTicketService } from './application/service/write/update.ticket.service';
import { FIND_TICKET_ALL_USE_CASE } from './application/use-case/read/find.ticket.all.usecase';
import { FIND_TICKET_BY_PAGINATE_USE_CASE } from './application/use-case/read/find.ticket.by.paginate';
import { FIND_TICKET_BYID_USE_CASE } from './application/use-case/read/find.ticket.byid.usecase';
import { CLOSE_TICKET_USE_CASE } from './application/use-case/write/close.ticlet.usecase';
import { CREATE_TICKET_USE_CASE } from './application/use-case/write/create.ticket.usecase';
import { DELETE_TICKET_USE_CASE } from './application/use-case/write/delete.ticlet.usecase';
import { TICKET_RULES_USE_CASE } from './application/use-case/write/rules.ticket.usecase';
import { UPDATE_TICKET_USE_CASE } from './application/use-case/write/update.ticket.usecase';
import { TICKET_READ_REPOSITORY } from './domain/ports/ticket.read.repository';
import { TICKET_WRITE_REPOSITORY } from './domain/ports/ticket.write.repository';
import { PrismaTicketReadRepository } from './infrastrucuture/adapters/ticket.read.repository';
import { PrismaTicketWriteRepository } from './infrastrucuture/adapters/ticket.write.repository';
import { CloseTicketController } from './presentation/cobntroller/close.ticket.controller';
import { CreateTicketController } from './presentation/cobntroller/create.ticket.controller';
import { DeleteTicketController } from './presentation/cobntroller/delete.ticket.controller';
import { FindTicketAllController } from './presentation/cobntroller/find.ticket.all.controller';
import { FindTicketByPaginationController } from './presentation/cobntroller/find.ticket.by.pagination.controller';
import { FindTicketByIdController } from './presentation/cobntroller/find.ticket.byid.controller';
import { UpdateTicketController } from './presentation/cobntroller/update.ticket.controller';

const ticketController = [
  CreateTicketController,
  UpdateTicketController,
  CloseTicketController,
  FindTicketByIdController,
  FindTicketAllController,
  FindTicketByPaginationController,
  DeleteTicketController,
];

const ticketProviders = [
  {
    provide: TICKET_WRITE_REPOSITORY,
    useClass: PrismaTicketWriteRepository,
  },
  {
    provide: TICKET_READ_REPOSITORY,
    useClass: PrismaTicketReadRepository,
  },
  {
    provide: FIND_TICKET_BY_PAGINATE_USE_CASE,
    useClass: FindTicketByPaginationService,
  },
  {
    provide: FIND_TICKET_ALL_USE_CASE,
    useClass: FindTicketAllService,
  },
  {
    provide: FIND_TICKET_BYID_USE_CASE,
    useClass: FindTicketByIdService,
  },
  {
    provide: CREATE_TICKET_USE_CASE,
    useClass: CreateTicketService,
  },
  {
    provide: UPDATE_TICKET_USE_CASE,
    useClass: UpdateTicketService,
  },
  {
    provide: CLOSE_TICKET_USE_CASE,
    useClass: CloseTicketService,
  },
  {
    provide: DELETE_TICKET_USE_CASE,
    useClass: DeleteTicketService,
  },
  {
    provide: TICKET_RULES_USE_CASE,
    useValue: [new CanNotTicketUpdateService(), new ValidateStatusTicketService(), new UpdatePrioridadeTicketService()],
  },
];

@Module({
  imports: [],
  controllers: [...ticketController],
  providers: [...ticketProviders],
})
export class TicketsModule {}
