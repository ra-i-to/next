export class User {
  private _id: string;
  private _accountId: string;
  private _name?: string;
  private _birth?: Date | null;
  private _profile?: string;
  private _locationId?: string | null;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt?: Date | null;
  // private _icon?: Icon | null;
  // private _location?: Location | null;

  constructor(
    id: string,
    accountId: string,
    name: string,
    birth: Date | null,
    profile: string,
    locationId: string | null,
    createdAt: Date,
    updatedAt: Date,
    locationId: string,
    deletedAt?: Date,
    // icon?: Icon,
    // location?: Location
  ) {
    this._id = id;
    this._accountId = accountId;
    this._name = name;
    this._birth = birth;
    this._profile = profile;
    this._locationId = locationId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._deletedAt = deletedAt;
    // this._icon = icon;
    this._locationId = locationId;
    // this._location = location;
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

  get name(): string | null | undefined {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get birth(): Date | null | undefined {
    return this._birth;
  }

  set birth(value: Date | null | undefined) {
    this._birth = value;
  }

  get profile(): string | null | undefined {
    return this._profile;
  }

  set profile(value: string) {
    this._profile = value;
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

  get locationId(): string | null | undefined {
    return this._locationId;
  }

  set locationId(value: string | null | undefined) {
    this._locationId = value;
  }
}
