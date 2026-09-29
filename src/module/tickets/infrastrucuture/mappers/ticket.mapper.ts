import { Ticket as PrismaTicket } from '@prisma/client';
import { TicketEntity } from '../../domain/entities/tickets.entity';

export class TicketMapper {
  // Converte Prisma Model (Database) -> Entidade de Domínio
  static toTicketEntityFromTicket(raw: PrismaTicket): TicketEntity {
    return TicketEntity.restoreTicket(
      raw.id,
      raw.title,
      raw.description,
      raw.prioridade,
      raw.status,
      raw.createdAt,
      raw.updatedAt,
      raw.deletedAt,
      raw.justificativa,
    );
  }

  // Converte Lista do Prisma -> Lista de Entidades
  static toListTicketEntityFromListTicket(rawList: PrismaTicket[]): TicketEntity[] {
    return rawList.map((raw) => this.toTicketEntityFromTicket(raw));
  }

  // Converte Entidade de Domínio -> Prisma Model/Payload
  static toTicketFromTicketEntity(entity: TicketEntity): PrismaTicket {
    return {
      id: entity.id.value,
      title: entity.title.value,
      description: entity.description.value,
      status: entity.status.value,
      prioridade: entity.prioridade.value,
      justificativa: entity.justificativa?.value ?? null,
      createdAt: entity.createdAt ?? new Date(),
      updatedAt: entity.updatedAt ?? null,
      deletedAt: entity.deletedAt ?? null,
    };
  }
}
