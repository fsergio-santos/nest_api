export const CLOSE_TICKET_USE_CASE = 'CLOSE_TICKET_USE_CASE';

export interface CloseTikectUseCase {
  execute(id: string): Promise<void>;
}
