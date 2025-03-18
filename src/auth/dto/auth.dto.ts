import {
  IsEmail,
  IsIn,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

enum UserRole {
  R001, //SuperAdmin
  R002, //Admin
  R003, //Customer
}
export class SignUpRequestDto {
  @IsNotEmpty()
  UserName: string;

  @IsNotEmpty()
  @IsString()
  FullName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  Email: string;

  @IsNotEmpty()
  @IsString()
  Password: string;

  @IsNotEmpty()
  @IsIn(['R001', 'R002', 'R003'], {
    message: 'Role must be either R001, R002 or R003',
  })
  Role: UserRole;
}

export class SignInRequestDto {
  @IsNotEmpty()
  UserName: string;

  @IsNotEmpty()
  Password: string;
}

export class RefreshTokenRequestDto {
  @IsNotEmpty()
  @IsString()
  RefreshToken: string;
}
