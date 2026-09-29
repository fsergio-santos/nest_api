import { Injectable } from '@nestjs/common';
import { ConflictError } from '../../../../shared/domain/error/conflict.error.domain';
import { NotFoundError } from '../../../../shared/domain/error/not.found.error.domain';
import { PrismaService } from '../../../../shared/infrastructure/database/prisma/prisma.service';
import { Prisma } from '../../../../shared/infrastructure/database/prisma/prisma/client';
import { TicketEntity } from '../../domain/entities/tickets.entity';
import { TicketWriteRepository } from '../../domain/ports/ticket.write.repository';
import { Status } from '../../domain/value-objects/status.value.objects';
import { TicketMapper } from '../mappers/ticket.mapper';

@Injectable()
export class PrismaTicketWriteRepository implements TicketWriteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTicket(ticket: TicketEntity): Promise<TicketEntity> {
    const data = TicketMapper.toTicketFromTicketEntity(ticket);
    try {
      const ticketCreated = await this.prisma.ticket.create({ data });
      return TicketMapper.toTicketEntityFromTicket(ticketCreated);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002: Unique constraint violation (ex: slug ou código único duplicado)
        if (error.code === 'P2002') {
          throw new ConflictError(`Já existe um ticket cadastrado com esses dados.`);
        }
        // P2025: Registro relacionado não encontrado (Foreign Key inválida)
        if (error.code === 'P2025') {
          throw new NotFoundError(`Usuário ou categoria vinculada não existe.`);
        }
      }
      throw error;
    }
  }

  async updateTicket(ticket: TicketEntity): Promise<TicketEntity> {
    const data = TicketMapper.toTicketFromTicketEntity(ticket);
    try {
      const ticketUpdated = await this.prisma.ticket.update({
        where: { id: ticket.id.value },
        data,
      });
      return TicketMapper.toTicketEntityFromTicket(ticketUpdated);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2025: Registro a ser atualizado não existe no banco
        if (error.code === 'P2025') {
          throw new NotFoundError(`Ticket com id "${ticket.id.value}" não encontrado para atualização.`);
        }

        // P2002: Violação de chave única (ex: título único ou slug duplicado)
        if (error.code === 'P2002') {
          throw new ConflictError(`Já existe um ticket cadastrado com esses dados.`);
        }
      }
      throw error;
    }
  }

  async updateTicketStatus(id: string, status: Status): Promise<void> {
    await this.prisma.ticket.update({
      where: { id },
      data: {
        status: status.value,
      },
    });
  }

  async deleteTicket(id: string): Promise<void> {
    try {
      await this.prisma.ticket.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2025: Registro a ser atualizado não existe no banco
        if (error.code === 'P2025') {
          throw new NotFoundError(`Ticket com id "${id}" não encontrado para atualizar status.`);
        }
      }

      throw error;
    }
  }
}
