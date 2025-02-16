import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNumber()
  @IsNotEmpty()
  password: string;
}
