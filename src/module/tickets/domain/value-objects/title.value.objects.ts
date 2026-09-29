import { ValueObjects } from '../../../../shared/domain/value.objects/value.objects';

export class Title extends ValueObjects<string> {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 150;

  constructor(value: string) {
    const sanitized = value?.trim();
    if (!sanitized || sanitized.length < Title.MIN_LENGTH || sanitized.length > Title.MAX_LENGTH) {
      throw new Error(`O título deve conter entre ${Title.MIN_LENGTH} e ${Title.MAX_LENGTH} caracteres.`);
    }
    super(sanitized);
  }

  static create(value: string): Title {
    return new Title(value);
  }
}
