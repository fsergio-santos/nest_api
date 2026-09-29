import { IsDate, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TicketProps } from '../../../domain/entities/tickets.entity';

export class TicketRequest {
  @IsOptional()
  id!: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  title!: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty({ message: 'A prioridade é obrigatória.' })
  @IsIn(['baixa', 'media', 'alta', 'BAIXA', 'MEDIA', 'ALTA'], {
    message: 'Prioridade deve ser BAIXA, MEDIA ou ALTA.',
  })
  prioridade!: string;

  @IsOptional()
  justificativa!: string;

  @IsOptional()
  status!: string;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  constructor(props: Partial<TicketProps>) {
    Object.assign(this, props);
  }
}
