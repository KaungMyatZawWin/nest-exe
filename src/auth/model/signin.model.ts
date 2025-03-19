// export class SignInResponseModel {
//   Id: number;
//   UserId: string;
//   UserName: string;
//   FullName: string | null;
//   Email: string;
//   Role: string;
//   CreatedAt: Date;
//   UpdatedAt: Date;
//   SessionId: string;
//   AccessToken: string;
//   RefreshToken: string;

//   constructor(
//     Id: number,
//     UserId: string,
//     UserName: string,
//     FullName: string | null,
//     Email: string,
//     Role: string,
//     CreatedAt: Date,
//     UpdatedAt: Date,
//     SessionId: string,
//     AccessToken: string,
//     RefreshToken: string,
//   ) {
//     this.Id = Id;
//     this.UserId = UserId;
//     this.UserName = UserName;
//     this.FullName = FullName;
//     this.Email = Email;
//     this.Role = Role;
//     this.CreatedAt = CreatedAt;
//     this.UpdatedAt = UpdatedAt;
//     this.SessionId = SessionId;
//     this.AccessToken = AccessToken;
//     this.RefreshToken = RefreshToken;
//   }
// }

// export class RefreshTokenResponseModel {
//   AccessToken: string;
//   constructor(accessToken: string) {
//     this.AccessToken = accessToken;
//   }
// }

interface UserObj {
  Id: number;
  UserId: string;
  UserName: string;
  FullName: string | null;
  Email: string;
  Role: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export class SignInResponseModel {
  SessionId: string;
  RefreshToken: string;
  User: UserObj;
  AccessToken: string;

  constructor(
    SessionId: string,
    RefreshToken: string,
    User: UserObj,
    AccessToken: string,
  ) {
    this.SessionId = SessionId;
    this.RefreshToken = RefreshToken;
    this.User = User
    this.AccessToken = AccessToken;
  }
}

export class RefreshTokenResponseModel {
  AccessToken: string;
  constructor(accessToken: string) {
    this.AccessToken = accessToken;
  }
}
