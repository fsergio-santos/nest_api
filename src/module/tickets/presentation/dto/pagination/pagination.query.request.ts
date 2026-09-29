import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Pageable } from '../../../../../shared/domain/pagination/pageable';

export class PaginationQueryRequest {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number = 10;

  @IsOptional()
  @IsString()
  field?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  order?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsString()
  search?: string;

  // Fábrica para criar o VO de domínio a partir dos dados validados da rota
  toPageable(allowedFields: string[]): Pageable {
    return new Pageable(
      {
        page: this.page,
        pageSize: this.pageSize,
        field: this.field,
        order: this.order,
      },
      allowedFields,
    );
  }
}
