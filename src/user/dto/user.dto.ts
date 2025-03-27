import { IsNotEmpty, IsString, IsOptional } from 'class-validator';


export class CreateUserRequestDto {

  @IsNotEmpty()
  @IsString()
  UserName: string;

  @IsOptional()
  @IsString()
  GitHubAccountName?: string;

  @IsOptional()
  @IsString()
  Nrc?: string;

  @IsOptional()
  @IsString()
  MobileNo?: string;
}

export class UpdateUserRequestDto {

  @IsOptional()
  @IsString()
  UserName: string;

  @IsOptional()
  @IsString()
  GitHubAccountName?: string;

  @IsOptional()
  @IsString()
  Nrc?: string;

  @IsOptional()
  @IsString()
  MobileNo?: string;
}

