import { SignInRequestDto, SignUpRequestDto } from './dto';
import * as argon2 from 'argon2';
import { ResultService } from 'src/models/result.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInResponseModel } from 'src/auth/model/signin.model';

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

  async singin(dto: SignInRequestDto) {
    try {
      const user = await this.prisma.tbl_User.findUnique({
        where: {
          UserName: dto.UserName,
        },
      });

      if (!user)
        return ResultService.ValidationError("User doesn't exist!", null, 404);

      const isMatchPass: boolean = await argon2.verify(
        user?.Password,
        dto.Password,
      );
      if (!isMatchPass)
        return ResultService.ValidationError(
          'Wrong password, please tyr again.',
          null,
          400,
        );

      const isLogin = await this.prisma.tbl_Login.create({
        data: {
          UserId: user.UserId,
        },
      });
      const token = await this.generateToken(user);

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
        token,
      );

      return ResultService.Success(model);
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }

  generateToken(dto: any): Promise<string> {
    const payload = dto;
    const secret = this.configService.get<string>('JWT_SECRET_KEY');

    return this.jwtService.signAsync(payload, {
      expiresIn: '60s',
      secret,
    });
  }
}
