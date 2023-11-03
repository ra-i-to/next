export class Photo {
  private _id: string;
  private _postId: string;
  private _url: string;
  private _cameraMaker?: string | null;
  private _cameraModel?: string | null;
  private _lensMaker?: string | null;
  private _lensModel?: string | null;
  private _exposureTime?: string | null;
  private _fNumber?: string | null;
  private _iso?: string | null;
  private _focalLength?: string | null;
  private _shotDate?: Date | null;
  private _shotLocation?: string | null;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt?: Date | null;

  constructor(
    id: string,
    postId: string,
    url: string,
    createdAt: Date,
    updatedAt: Date,
    cameraMaker?: string | null,
    cameraModel?: string | null,
    lensMaker?: string | null,
    lensModel?: string | null,
    exposureTime?: string | null,
    fNumber?: string | null,
    iso?: string | null,
    focalLength?: string | null,
    shotDate?: Date | null,
    shotLocation?: string | null,
    deletedAt?: Date | null
  ) {
    this._id = id;
    this._postId = postId;
    this._url = url;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._cameraMaker = cameraMaker || null;
    this._cameraModel = cameraModel || null;
    this._lensMaker = lensMaker || null;
    this._lensModel = lensModel || null;
    this._exposureTime = exposureTime || null;
    this._fNumber = fNumber || null;
    this._iso = iso || null;
    this._focalLength = focalLength || null;
    this._shotDate = shotDate || null;
    this._shotLocation = shotLocation || null;
    this._deletedAt = deletedAt || null;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get postId(): string {
    return this._postId;
  }

  set postId(value: string) {
    this._postId = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get cameraMaker(): string | null {
    if (!this._cameraMaker) {
      return null;
    }
    return this._cameraMaker;
  }

  set cameraMaker(value: string | null) {
    this._cameraMaker = value;
  }

  get cameraModel(): string | null {
    if (!this._cameraModel) {
      return null;
    }
    return this._cameraModel;
  }

  set cameraModel(value: string | null) {
    this._cameraModel = value;
  }

  get lensMaker(): string | null {
    if (!this._lensMaker) {
      return null;
    }
    return this._lensMaker;
  }

  set lensMaker(value: string | null) {
    this._lensMaker = value;
  }

  get lensModel(): string | null {
    if (!this._lensModel) {
      return null;
    }
    return this._lensModel;
  }

  set lensModel(value: string | null) {
    this._lensModel = value;
  }

  get exposureTime(): string | null {
    if (!this._exposureTime) {
      return null;
    }
    return this._exposureTime;
  }

  set exposureTime(value: string | null) {
    this._exposureTime = value;
  }

  get fNumber(): string | null {
    if (!this._fNumber) {
      return null;
    }
    return this._fNumber;
  }

  set fNumber(value: string | null) {
    this._fNumber = value;
  }

  get iso(): string | null {
    if (!this._iso) {
      return null;
    }
    return this._iso;
  }
  set iso(value: string | null) {
    this._iso = value;
  }

  get focalLength(): string | null {
    if (!this._focalLength) {
      return null;
    }
    return this._focalLength;
  }

  set focalLength(value: string | null) {
    this._focalLength = value;
  }

  get shotDate(): Date | null {
    if (!this._shotDate) {
      return null;
    }
    return this._shotDate;
  }

  set shotDate(value: Date | null) {
    this._shotDate = value;
  }

  get shotLocation(): string | null {
    if (!this._shotLocation) {
      return null;
    }
    return this._shotLocation;
  }

  set shotLocation(value: string | null) {
    this._shotLocation = value;
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
