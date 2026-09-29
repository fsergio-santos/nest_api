import { ValueObjects } from '../../../../shared/domain/value.objects/value.objects';

export enum TicketStatusEnum {
  ABERTO = 'ABERTO',
  CONCLUIDO = 'CONCLUIDO',
}

export class Status extends ValueObjects<TicketStatusEnum> {
  private constructor(value: TicketStatusEnum) {
    super(value);
  }

  static create(value: unknown): Status {
    if (typeof value !== 'string' || !value.trim()) {
      throw new Error('O status deve ser um texto preenchido.');
    }

    const normalized = value.trim().toUpperCase() as TicketStatusEnum;

    if (!Object.values(TicketStatusEnum).includes(normalized)) {
      throw new Error(
        `Status inválido: "${value}". Valores permitidos: ${Object.values(TicketStatusEnum).join(', ')}.`,
      );
    }

    return new Status(normalized);
  }

  static aberto(): Status {
    return new Status(TicketStatusEnum.ABERTO);
  }

  static concluido(): Status {
    return new Status(TicketStatusEnum.CONCLUIDO);
  }

  // Regra de transição
  canTransitionTo(next: Status): boolean {
    if (this.isConcluido() && next.isAberto()) {
      return false;
    }
    return true;
  }

  // Métodos semânticos usando o getter herdado (this.value)
  isAberto(): boolean {
    return this.value === TicketStatusEnum.ABERTO;
  }

  isConcluido(): boolean {
    return this.value === TicketStatusEnum.CONCLUIDO;
  }
}
