import {
  RefreshTokenRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
} from './dto';
import * as argon2 from 'argon2';
import { ResultService } from 'src/models/result.service';
import { JwtService } from '@nestjs/jwt';
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
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // User Management
  private async createUser(dto: SignUpRequestDto) {
    const hashedPassword = await argon2.hash(dto.Password);
    const newUser = await this.prisma.tbl_User.create({
      data: {
        UserName: dto.UserName,
        FullName: dto.FullName,
        Email: dto.Email,
        Password: hashedPassword,
        //@ts-ignore
        Role: dto.Role,
      },
    });
    //@ts-ignore
    delete newUser.Password;
    return newUser;
  }

  private async validateUserExists(userName: string, email: string) {
    const user = await this.prisma.tbl_User.findFirst({
      where: {
        OR: [{ UserName: userName }, { Email: email }],
      },
    });
    return user;
  }

  private async validateUserCredentials(userName: string, password: string) {
    const user = await this.prisma.tbl_User.findUnique({
      where: { UserName: userName },
    });
    if (!user) return null;

    const isMatchPass = await argon2.verify(user.Password, password);
    return isMatchPass ? user : null;
  }

  // Token Management
  private generateAccessToken(user: any) {
    return this.jwtService.sign(user);
  }

  private async generateRefreshTokenAndExpiresTime() {
    const refreshToken = uuidv4();
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    return { refreshToken, expiresAt };
  }

  private async validateRefreshToken(refreshToken: string) {
    const token = await this.prisma.tbl_Login.findFirst({
      where: {
        RefreshToken: refreshToken,
      },
    });
    return token;
  }

  // Session and refresh token Management
  private async createUserSession(
    userId: string,
    refreshToken: string,
    expiresAt: Date | string,
  ) {
    const session = await this.prisma.tbl_Login.create({
      data: {
        UserId: userId,
        RefreshToken: refreshToken,
        ExpiredAt: expiresAt,
      },
    });
    return session.SessionId;
  }

  // Public API Methods
  async signup(dto: SignUpRequestDto) {
    try {
      const existingUser = await this.validateUserExists(
        dto.UserName,
        dto.Email,
      );
      if (existingUser) {
        return ResultService.ValidationError<string>(
          'User already exist!',
          null,
          409,
        );
      }

      const newUser = await this.createUser(dto);
      return ResultService.Success(newUser, 'SignUp success.');
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }

  async signin(dto: SignInRequestDto) {
    try {
      const user = await this.validateUserCredentials(
        dto.UserName,
        dto.Password,
      );
      if (!user) {
        return ResultService.ValidationError(
          user ? 'Invalid password!' : "User doesn't exist!",
          null,
          user ? 401 : 404,
        );
      }

      const accessToken = this.generateAccessToken(user);
      const refreshToken = await this.generateRefreshTokenAndExpiresTime();
      const sessionId = await this.createUserSession(
        user.UserId,
        refreshToken.refreshToken,
        refreshToken.expiresAt,
      );

      const model = new SignInResponseModel(
        sessionId,
        refreshToken.refreshToken,
        user,
        accessToken,
      );

      return ResultService.Success(model, 'Successfully login');
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }

  async refresh(dto: RefreshTokenRequestDto) {
    try {
      const token = await this.validateRefreshToken(dto.RefreshToken);
      if (!token) {
        return ResultService.NotFoundError('Invalid Token!', null, 404);
      }
      if (token.ExpiredAt <= new Date()) {
        return ResultService.ValidationError(
          'Refresh token is expired!',
          null,
          419,
        );
      }

      const user = await this.prisma.tbl_User.findUnique({
        where: { UserId: token.UserId },
      });
      if (!user) {
        return ResultService.NotFoundError("User doesn't exist!", null, 404);
      }

      const accessToken = this.generateAccessToken(user);
      const model = new RefreshTokenResponseModel(accessToken);
      return ResultService.Success(model, 'New access token.');
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }

  async signout(dto: RefreshTokenRequestDto) {
    try {
      const isExist = await this.prisma.tbl_Login.findFirst({
        where: {
          RefreshToken:dto.RefreshToken
        }
      });
      if(!isExist)return ResultService.NotFoundError("Session doesn't exist!",null,404);      
      
      const result = await this.prisma.tbl_Login.update({
        where: {
          SessionId: isExist.SessionId,
        },
        data: {
          RefreshToken: '',
          UpdatedAt: new Date()
        },
      });
      if (!result) {
        return ResultService.SystemError('Failed to signout!', null, 500);
      }
      return ResultService.LogoutSuccess('Successfully logout.', 200);
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }
}
