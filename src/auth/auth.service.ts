import {
  RefreshTokenRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
} from './dto';
import * as argon2 from 'argon2';
import { ResultService } from 'src/models/result.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  RefreshTokenResponseModel,
  SignInResponseModel,
} from 'src/auth/model/signin.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signup(dto: SignUpRequestDto) {
    try {
      const user = await this.prisma.tbl_User.findFirst({
        where: {
          OR: [{ UserName: dto.UserName }, { Email: dto.Email }],
        },
      });

      if (user) {
        return ResultService.ValidationError<string>(
          'User already exist!',
          null,
          409,
        );
      }

      const hashedPassword: string = await argon2.hash(dto.Password);
      const newUser: any = await this.prisma.tbl_User.create({
        data: {
          UserName: dto.UserName,
          FullName: dto.FullName,
          Email: dto.Email,
          Password: hashedPassword,
          //@ts-ignore
          Role: dto.Role,
        },
      });
      delete newUser.Password;

      return ResultService.Success(newUser, 'SignUp success.');
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }

  async signin(dto: SignInRequestDto) {
    try {
      const user = await this.prisma.tbl_User.findUnique({
        where: {
          UserName: dto.UserName,
        },
      });
      if (!user)
        return ResultService.ValidationError("User doesn't exist!", null, 404);

      const isMatchPass = await argon2.verify(user.Password, dto.Password);
      if (!isMatchPass)
        return ResultService.ValidationError('Invalid password!', null, 401);

      //generate access token
      const accessToken = this.jwtService.sign(user);

      //generate refresh token and add into db
      const refreshToken = uuidv4();
      const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
      await this.prisma.tbl_RefreshToken.create({
        data: {
          Token: refreshToken,
          UserId: user.UserId,
          ExpiredAt: expiresAt,
        },
      });

      //add user session into db
      const isLogin = await this.prisma.tbl_Login.create({
        data: {
          UserId: user.UserId,
        },
      });

      const model = new SignInResponseModel(
        user.Id,
        user.UserId,
        user.UserName,
        user.FullName,
        user.Email,
        user.Role,
        user.CreatedAt,
        user.UpdatedAt,
        isLogin.SessionId,
        accessToken,
        refreshToken,
      );
      return ResultService.Success(model, 'Successfully login');
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }

  async refresh(dto: RefreshTokenRequestDto) {
    try {
      const token = await this.prisma.tbl_RefreshToken.findUnique({
        where: {
          Token: dto.RefreshToken,
        },
      });
      if (!token)
        return ResultService.NotFoundError('Invalid Token!', null, 404);

      if (token.ExpiredAt <= new Date())
        return ResultService.ValidationError(
          'Refresh token is expired!',
          null,
          419,
        );

      const user = await this.prisma.tbl_User.findUnique({
        where: {
          UserId: token.UserId,
        },
      });
      if (!user)
        return ResultService.NotFoundError("User doesn't exist!", null, 404);

      const accessToken = this.jwtService.sign(user);
      const model = new RefreshTokenResponseModel(accessToken);
      return ResultService.Success(model, 'New access token.');
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }

  async signout(dto: RefreshTokenRequestDto) {
    
    try {
      const result = await this.prisma.tbl_RefreshToken.delete({
        where: {
          Token: dto.RefreshToken,
        },
      });
      if (!result)
        return ResultService.SystemError('Failed to signout!', null, 500);

      return ResultService.LogoutSuccess("Successfully logout.",200)
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }
}
