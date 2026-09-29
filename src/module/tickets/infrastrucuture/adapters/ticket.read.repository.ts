import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Page } from '../../../../shared/domain/pagination/page';
import { Pageable } from '../../../../shared/domain/pagination/pageable';

import { PrismaService } from '../../../../shared/infrastructure/database/prisma/prisma.service';
import { TicketEntity } from '../../domain/entities/tickets.entity';
import { TicketReadRepository } from '../../domain/ports/ticket.read.repository';
import { TicketMapper } from '../mappers/ticket.mapper';

@Injectable()
export class PrismaTicketReadRepository implements TicketReadRepository {
  sortableFields: string[] = ['title', 'status', 'prioridade'];

  constructor(private readonly prisma: PrismaService) {}

  async findTicketByPaginate(pageable: Pageable, filter?: string): Promise<Page<TicketEntity>> {
    const where: Prisma.TicketWhereInput = {
      deletedAt: null,
      ...(filter && {
        OR: [
          { title: { contains: filter, mode: 'insensitive' } },
          { description: { contains: filter, mode: 'insensitive' } },
        ],
      }),
    };

    const [total, records] = await this.prisma.$transaction([
      this.prisma.ticket.count({ where }),
      this.prisma.ticket.findMany({
        where,
        orderBy: { [pageable.field]: pageable.order.toLowerCase() },
        skip: pageable.offset, // (page - 1) * pageSize
        take: pageable.limit, // pageSize
      }),
    ]);

    const ticketEntity = TicketMapper.toListTicketEntityFromListTicket(records);
    return Page.of(ticketEntity, total, pageable);
  }

  async findTicketAll(): Promise<TicketEntity[]> {
    const ticket = await this.prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return TicketMapper.toListTicketEntityFromListTicket(ticket);
  }

  async findTicketById(id: string): Promise<TicketEntity | null> {
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        id,
      },
    });
    if (!ticket) {
      return null;
    }
    return TicketMapper.toTicketEntityFromTicket(ticket);
  }
}
