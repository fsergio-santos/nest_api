import { Expose } from 'class-transformer';
import { NivelPrioridade } from '../../../domain/value-objects/prioridade.value.objects';
import { TicketStatusEnum } from '../../../domain/value-objects/status.value.objects';

export class TicketResponse {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  prioridade!: NivelPrioridade;

  @Expose()
  justificativa?: string | null;

  @Expose()
  status!: TicketStatusEnum;

  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
