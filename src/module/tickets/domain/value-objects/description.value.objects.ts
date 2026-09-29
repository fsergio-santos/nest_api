import { ValueObjects } from '../../../../shared/domain/value.objects/value.objects';

export class Description extends ValueObjects<string> {
  private static readonly MIN_LENGTH = 10;
  private static readonly MAX_LENGTH = 250;

  constructor(value: string) {
    const sanitized = value?.trim();
    if (!sanitized || sanitized.length < Description.MIN_LENGTH || sanitized.length > Description.MAX_LENGTH) {
      throw new Error(
        `A descrição deve conter entre ${Description.MIN_LENGTH} e ${Description.MAX_LENGTH} caracteres.`,
      );
    }
    super(sanitized);
  }

  static create(value: string): Description {
    return new Description(value);
  }
}
