import { BaseEntity, DefaultTimestampProps } from '../../../../shared/domain/entity/base.entity';
import { EntityValidationError } from '../../../../shared/domain/validators/entity.validator.error';
import { TicketValidatorFactory } from '../validators/ticket.entity.rules';
import { Description } from '../value-objects/description.value.objects';
import { Justificativa } from '../value-objects/justificativa.value.objects';
import { NivelPrioridade, Prioridade } from '../value-objects/prioridade.value.objects';
import { Status, TicketStatusEnum } from '../value-objects/status.value.objects';
import { TicketId } from '../value-objects/ticketid.value.objects';
import { Title } from '../value-objects/title.value.objects';

export type TicketProps = {
  id: TicketId;
  title: Title;
  description: Description;
  justificativa?: Justificativa | null;
  prioridade: Prioridade;
  status: Status;
} & DefaultTimestampProps;

export class TicketEntity extends BaseEntity<TicketProps> {
  constructor(props: TicketProps) {
    // 1. Validação executada antes de instanciar a entidade
    TicketEntity.validate(props);
    super(props);
  }

  // --- Regras de Mutação com Validação Proativa ---

  updateTicket(title: string, description: string): void {
    if (this.props.status.isConcluido()) {
      throw new Error('Não é possível editar informações de um ticket concluído.');
    }

    const nextProps: TicketProps = {
      ...this.props,
      title: Title.create(title) ?? this.props.title,
      description: Description.create(description) ?? this.props.description,
    };

    // Valida o novo estado completo antes de aplicar a alteração
    TicketEntity.validate(nextProps);

    this.props.title = nextProps.title;
    this.props.description = nextProps.description;
    this.setUpdatedAt();
  }

  closeTicket(): void {
    if (this.props.status.isConcluido()) {
      throw new Error('O ticket já se encontra fechado.');
    }

    this.props.status = Status.concluido();
    this.setUpdatedAt();
  }

  changePrioridadeTicket(novaPrioridade: string, justificativa?: string): void {
    if (this.props.status.isConcluido()) {
      throw new Error('Não é possível alterar a prioridade de um ticket concluído.');
    }

    const novaPrioridadeVO = Prioridade.create(novaPrioridade);

    if (this.props.prioridade.equals(novaPrioridadeVO)) {
      return;
    }

    if (novaPrioridadeVO.isHigherThan(this.props.prioridade) && !justificativa) {
      throw new EntityValidationError({
        justificativa: ['Escalonamento de prioridade exige uma justificativa.'],
      });
    }

    this.props.prioridade = novaPrioridadeVO;
    if (justificativa) Justificativa.create(justificativa);
  }

  changeStatus(newStatus: string): void {
    const nextStatus = Status.create(newStatus);
    if (!this.props.status.canTransitionTo(nextStatus)) {
      throw new Error(`Transição de status inválida de ${this.props.status.value} para ${newStatus}.`);
    }

    this.props.status = nextStatus;
  }

  public delete(): void {
    this.props.deletedAt = new Date();
    this.setUpdatedAt();
  }

  // --- Getters Puros (Sem side-effects de alteração de data) ---

  get id(): TicketId {
    return this.props.id;
  }

  get title(): Title {
    return this.props.title;
  }

  get description(): Description {
    return this.props.description;
  }

  get prioridade(): Prioridade {
    return this.props.prioridade;
  }

  get justificativa(): Justificativa | null {
    return this.props.justificativa ?? null;
  }

  get status(): Status {
    return this.props.status;
  }

  // --- Fábricas de Criação ---

  static createTicket(
    id: string,
    title: string,
    description: string,
    prioridade: NivelPrioridade | string,
    justificativa?: string,
  ): TicketEntity {
    return new TicketEntity({
      id: TicketId.create(id),
      title: Title.create(title),
      description: Description.create(description),
      justificativa: justificativa ? Justificativa.create(justificativa) : null,
      prioridade: Prioridade.create(prioridade),
      status: Status.aberto(),
    });
  }

  static restoreTicket(
    id: string,
    title: string,
    description: string,
    prioridadeRaw: NivelPrioridade | string,
    statusRaw: TicketStatusEnum | string,
    createdAt?: Date,
    updatedAt?: Date | null,
    deletedAt?: Date | null,
    justificativa?: string | null,
  ): TicketEntity {
    return new TicketEntity({
      id: TicketId.create(id),
      title: Title.create(title),
      description: Description.create(description),
      prioridade: Prioridade.create(prioridadeRaw),
      status: Status.create(statusRaw),
      justificativa: justificativa ? Justificativa.create(justificativa) : null,
      createdAt,
      updatedAt,
      deletedAt,
    });
  }

  static validate(props: TicketProps): void {
    const validator = TicketValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors!);
    }
  }
}
