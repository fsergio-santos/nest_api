import { ValueObjects } from '../../../../shared/domain/value.objects/value.objects';

export class Justificativa extends ValueObjects<string> {
  private static readonly MIN_LENGTH = 5;
  private static readonly MAX_LENGTH = 500;

  constructor(value: string) {
    const sanitized = value?.trim();

    if (!sanitized || sanitized.length < Justificativa.MIN_LENGTH || sanitized.length > Justificativa.MAX_LENGTH) {
      throw new Error(
        `A justificativa deve conter entre ${Justificativa.MIN_LENGTH} e ${Justificativa.MAX_LENGTH} caracteres.`,
      );
    }
    super(sanitized);
  }

  static create(value: string): Justificativa | null {
    if (!value || value.trim().length === 0) {
      return null;
    }
    return new Justificativa(value);
  }
}
