export class UserRegistrationStatus {
  private _id: string;
  private _accountId: string;
  private _preRegisteredAt: Date;
  private _registeredAt?: Date | null;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt?: Date | null;

  constructor(
    id: string,
    accountId: string,
    preRegisteredAt: Date,
    createdAt: Date,
    updatedAt: Date,
    registeredAt?: Date | null,
    deletedAt?: Date
  ) {
    this._id = id;
    this._accountId = accountId;
    this._preRegisteredAt = preRegisteredAt;
    this._registeredAt = registeredAt;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._deletedAt = deletedAt;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get accountId(): string {
    return this._accountId;
  }

  set accountId(value: string) {
    this._accountId = value;
  }

  get preRegisteredAt(): Date {
    return this._preRegisteredAt;
  }

  set preRegisteredAt(value: Date) {
    this._preRegisteredAt = value;
  }

  get registeredAt(): Date | null | undefined {
    return this._registeredAt;
  }

  set registeredAt(value: Date | null | undefined) {
    this._registeredAt = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  get deletedAt(): Date | null | undefined {
    return this._deletedAt;
  }

  set deletedAt(value: Date | null | undefined) {
    this._deletedAt = value;
  }
}
