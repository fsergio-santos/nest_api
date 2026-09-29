import { plainToInstance } from 'class-transformer';
import { TicketEntity } from '../../domain/entities/tickets.entity';
import { TicketRequest } from '../dto/ticket/ticket.request';
import { TicketResponse } from '../dto/ticket/ticket.response';

export class TicketMapper {
  // Converte DTO de Entrada (HTTP/App) -> Entidade de Domínio
  static toTicketEntityFromRequest(request: TicketRequest): TicketEntity {
    return TicketEntity.createTicket(
      request.id,
      request.title,
      request.description,
      request.prioridade,
      request.justificativa,
    );
  }

  // Converte Entidade de Domínio -> DTO de Saída (Primitivos para JSON)
  static toTicketResponseFromTicketEntity(entity: TicketEntity): TicketResponse {
    return plainToInstance(
      TicketResponse,
      {
        id: entity.id.value ?? entity.id,
        title: entity.title.value ?? entity.title,
        description: entity.description.value ?? entity.description,
        prioridade: entity.prioridade.value,
        status: entity.status.value,
        justificativa: entity.justificativa?.value ?? null,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt ?? null,
        deletedAt: entity.deletedAt ?? null,
      },
      { excludeExtraneousValues: true },
    );
  }

  // Converte Lista de Entidades -> Lista de DTOs de Saída
  static toListTicketResponseFromListTicketEntity(entities: TicketEntity[]): TicketResponse[] {
    return entities.map((entity) => this.toTicketResponseFromTicketEntity(entity));
  }
}
