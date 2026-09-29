import { Pageable } from './pageable';

export class Page<T> {
  readonly content: T[];
  readonly totalElements: number;
  readonly totalPages: number;
  readonly page: number;
  readonly pageSize: number;
  readonly isFirst: boolean;
  readonly isLast: boolean;

  private constructor(content: T[], totalElements: number, pageable: Pageable) {
    this.content = content;
    this.totalElements = totalElements;
    this.page = pageable.page;
    this.pageSize = pageable.pageSize;
    this.totalPages = Math.ceil(totalElements / pageable.pageSize) || 1;
    this.isFirst = this.page === 1;
    this.isLast = this.page >= this.totalPages;
  }

  static of<T>(content: T[], totalElements: number, pageable: Pageable): Page<T> {
    return new Page<T>(content, totalElements, pageable);
  }

  /**
   * Permite transformar os itens de domínio (ex: Entity -> DTO/Response)
   * mantendo a integridade dos metadados de paginação.
   */
  map<U>(fn: (item: T) => U): Page<U> {
    const mappedContent = this.content.map(fn);
    return new Page<U>(mappedContent, this.totalElements, {
      page: this.page,
      pageSize: this.pageSize,
    } as Pageable);
  }
}
