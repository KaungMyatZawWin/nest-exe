import { Injectable } from '@nestjs/common';
import { AuthDto, SignUpRequestDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignUpRequestDto) {
    
    const hashedPassword: string = await argon2.hash(dto.Password);
    const user = await this.prisma.tbl_User.create({
      data: {
        UserName: dto.UserName,
        FullName: dto.FullName,
        Email: dto.Email,
        Password: hashedPassword,
      },
    });

    return user;
  }

  singin() {
    return { message: 'This is signin service.' };
  }
}
