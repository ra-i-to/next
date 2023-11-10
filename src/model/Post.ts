import { Photo } from "@prisma/client";

export class Post {
  private _id: string;
  private _accountId: string;
  private _photos: Photo[];
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt?: Date | null;

  constructor(
    id: string,
    accountId: string,
    photos: Photo[] = [],
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date | null
  ) {
    this._id = id;
    this._accountId = accountId;
    this._photos = photos;
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

  get photos(): Photo[] {
    return this._photos;
  }

  set photos(value: Photo[]) {
    this._photos = value;
  }

  addPhoto(photo: Photo): void {
    this._photos.push(photo);
  }

  removePhoto(photoId: string): void {
    this._photos = this._photos.filter((photo) => photo.id !== photoId);
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
