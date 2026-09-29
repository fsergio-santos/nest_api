import { ValueObjects } from '../../../../shared/domain/value.objects/value.objects';

export class TicketId extends ValueObjects<string> {
  private static readonly MIN_LENGTH = 5;
  private static readonly MAX_LENGTH = 500;

  constructor(value: string) {
    const sanitized = value?.trim();
    if (!sanitized || sanitized.length < TicketId.MIN_LENGTH || sanitized.length > TicketId.MAX_LENGTH) {
      throw new Error(`A justificativa deve conter entre ${TicketId.MIN_LENGTH} e ${TicketId.MAX_LENGTH} caracteres.`);
    }
    super(sanitized);
  }

  static create(value: string): TicketId {
    return new TicketId(value);
  }
}
