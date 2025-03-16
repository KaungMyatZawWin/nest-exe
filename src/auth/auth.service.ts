import {  Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResultService } from 'src/models/result.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
        },
      });
      delete newUser.Password;

      return ResultService.Success(newUser, 'SignUp success.');
    } catch (error) {
      return ResultService.SystemError(error.message, null, 409);
    }
  }

  singin() {
    return { message: 'This is signin service.' };
  }
}
