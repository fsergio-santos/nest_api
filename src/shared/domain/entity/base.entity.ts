export type DefaultTimestampProps = {
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};

export abstract class BaseEntity<Props extends DefaultTimestampProps> {
  public readonly props: Props;

  constructor(props: Props) {
    this.props = props;
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? new Date();
    this.props.deletedAt = props.deletedAt ?? null;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt ?? null;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt ?? null;
  }

  protected setUpdatedAt(): void {
    this.props.updatedAt = new Date();
  }
}
