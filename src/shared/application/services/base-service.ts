export interface BaseService<I, O> {
  execute(i: I): Promise<O>;
}
