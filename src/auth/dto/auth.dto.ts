import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpRequestDto {
  @IsNotEmpty()
  UserName :string;

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
}
