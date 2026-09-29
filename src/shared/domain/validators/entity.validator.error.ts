import { FieldsErrors } from './validators.fields.interface';

export class EntityValidationError extends Error {
  constructor(
    public readonly error: FieldsErrors,
    message = 'Validation Error',
  ) {
    super(message);
    this.name = 'EntityValidationError';
  }
}
