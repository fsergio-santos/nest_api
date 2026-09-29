// src/tickets/domain/value-objects/priority.vo.ts

import { ValueObjects } from '../../../../shared/domain/value.objects/value.objects';

export enum NivelPrioridade {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
}

export class Prioridade extends ValueObjects<NivelPrioridade> {
  private static readonly WEIGHTS: Record<NivelPrioridade, number> = {
    [NivelPrioridade.BAIXA]: 1,
    [NivelPrioridade.MEDIA]: 2,
    [NivelPrioridade.ALTA]: 3,
  };

  private constructor(value: NivelPrioridade) {
    super(value);
  }

  static create(value: unknown): Prioridade {
    if (typeof value !== 'string' || !value.trim()) {
      throw new Error('A prioridade deve ser um texto preenchido.');
    }

    const normalized = value.trim().toUpperCase() as NivelPrioridade;

    if (!Object.values(NivelPrioridade).includes(normalized)) {
      const permitidos = Object.values(NivelPrioridade).join(', ');
      throw new Error(`Prioridade inválida: "${value}". Valores permitidos: ${permitidos}.`);
    }

    return new Prioridade(normalized);
  }

  // Factory methods semânticos opcionais
  static baixa(): Prioridade {
    return new Prioridade(NivelPrioridade.BAIXA);
  }

  static media(): Prioridade {
    return new Prioridade(NivelPrioridade.MEDIA);
  }

  static alta(): Prioridade {
    return new Prioridade(NivelPrioridade.ALTA);
  }

  // Comparações de negócio
  isHigherThan(other: Prioridade): boolean {
    return Prioridade.WEIGHTS[this.value] > Prioridade.WEIGHTS[other.value];
  }

  isUrgent(): boolean {
    return this.value === NivelPrioridade.ALTA;
  }
}
