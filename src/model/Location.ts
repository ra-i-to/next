export class Location {
  private _id: string;
  private _locationName: string;
  // private _users: User[];
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt?: Date | null;

  constructor(
    id: string,
    locationName: string,
    // users: User[],
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null
  ) {
    this._id = id;
    this._locationName = locationName;
    // this._users = users;
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

  get locationName(): string {
    return this._locationName;
  }

  set locationName(value: string) {
    this._locationName = value;
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
