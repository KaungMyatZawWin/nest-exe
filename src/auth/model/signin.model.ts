export class SignInResponseModel {
  Id: number;
  UserId: string;
  UserName: string;
  FullName: string | null;
  Email: string;
  Role: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  SessionId: string;
  AccessToken: string;
  RefreshToken: string;

  constructor(
    Id: number,
    UserId: string,
    UserName: string,
    FullName: string | null,
    Email: string,
    Role: string,
    CreatedAt: Date,
    UpdatedAt: Date,
    SessionId: string,
    AccessToken: string,
    RefreshToken: string,
  ) {
    this.Id = Id;
    this.UserId = UserId;
    this.UserName = UserName;
    this.FullName = FullName;
    this.Email = Email;
    this.Role = Role;
    this.CreatedAt = CreatedAt;
    this.UpdatedAt = UpdatedAt;
    this.SessionId = SessionId;
    this.AccessToken = AccessToken;
    this.RefreshToken = RefreshToken;
  }
}

export class RefreshTokenResponseModel {
  AccessToken: string;
  constructor(accessToken: string) {
    this.AccessToken = accessToken;
  }
}
