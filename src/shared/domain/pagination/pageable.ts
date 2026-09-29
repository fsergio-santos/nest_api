import { SortDirection } from './pagination.order';

export type PageableProps = {
  page?: number;
  pageSize?: number;
  field?: string;
  order?: SortDirection | string;
};

export class Pageable {
  readonly page: number;
  readonly pageSize: number;
  readonly field: string;
  readonly order: SortDirection;

  constructor(props: PageableProps = {}, allowedFields: string[] = ['createdAt']) {
    const rawPage = Number(props.page);
    this.page = !rawPage || rawPage < 1 ? 1 : Math.floor(rawPage);

    const rawPageSize = Number(props.pageSize);
    if (!rawPageSize || rawPageSize < 1) {
      this.pageSize = 10;
    } else {
      this.pageSize = rawPageSize > 100 ? 100 : Math.floor(rawPageSize);
    }

    const defaultField = allowedFields[0] ?? 'createdAt';
    this.field = props.field && allowedFields.includes(props.field) ? props.field : defaultField;

    this.order = props.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }

  get offset(): number {
    return (this.page - 1) * this.pageSize;
  }

  get limit(): number {
    return this.pageSize;
  }
}
