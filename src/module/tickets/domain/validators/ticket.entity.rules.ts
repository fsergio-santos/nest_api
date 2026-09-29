import { IsDate, IsDefined, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ClassValidatorFields } from '../../../../shared/domain/validators/validators.fields.classe';
import { TicketProps } from '../entities/tickets.entity';
import { NivelPrioridade } from '../value-objects/prioridade.value.objects';
import { TicketStatusEnum } from '../value-objects/status.value.objects';

export class TicketRules {
  @IsNotEmpty({ message: 'O id é obrigatório.' })
  id!: string;

  @IsNotEmpty({ message: 'O título é obrigatório.' })
  @IsString({ message: 'O título deve ser um texto.' })
  @MaxLength(255, { message: 'O título não pode exceder 255 caracteres.' })
  title!: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @IsString({ message: 'A descrição deve ser um texto.' })
  description!: string;

  @IsOptional()
  @IsString({ message: 'A justificativa deve ser um texto.' })
  justificativa?: string | null;

  @IsDefined({ message: 'A prioridade é obrigatória.' })
  prioridade!: NivelPrioridade;

  @IsDefined({ message: 'O status é obrigatório.' })
  status!: TicketStatusEnum;

  @IsOptional()
  @IsDate({ message: 'createdAt deve ser uma data válida.' })
  createdAt?: Date;

  @IsOptional()
  @IsDate({ message: 'updatedAt deve ser uma data válida.' })
  updatedAt?: Date | null;

  @IsOptional()
  @IsDate({ message: 'deletedAt deve ser uma data válida.' })
  deletedAt?: Date | null;

  constructor(data: TicketProps) {
    if (!data) return;

    // Extrai os valores primitivos de dentro de cada VO
    this.id = data.id?.value;
    this.title = data.title?.value;
    this.description = data.description?.value;
    this.justificativa = data.justificativa ? data.justificativa.value : null;
    this.prioridade = data.prioridade?.value;
    this.status = data.status?.value;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }
}

export class TicketValidator extends ClassValidatorFields<TicketRules> {
  validate(data: TicketProps): boolean {
    return super.validate(new TicketRules(data ?? ({} as any)));
  }
}

export class TicketValidatorFactory {
  static create(): TicketValidator {
    return new TicketValidator();
  }
}
