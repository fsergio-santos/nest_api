export const DELETE_TICKET_USE_CASE = 'DELETE_TICKET_USE_CASE';

export interface DeleteTikectUseCase {
  execute(id: string): Promise<void>;
}
