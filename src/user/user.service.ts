import { Injectable } from '@nestjs/common';
import { ResultService } from 'src/models/result.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserRequestDto, UpdateUserRequestDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser() {
    try {
      const user = await this.prisma.user.findMany();
      if (!user || user.length <= 0) {
        return ResultService.NotFoundError('There is no data!', null, 404);
      }
      return ResultService.Success(user);
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }

  async getUserById(userCode: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          UserCode: userCode,
        },
      });
      // prettier-ignore
      if (!user) return ResultService.NotFoundError('User not found!', null, 404);

      return ResultService.Success(user);
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }

  async createUser(req: CreateUserRequestDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          UserName: req.UserName,
        },
      });
      //prettier-ignore
      if (user) return ResultService.ValidationError('Username already exist! Please try another.',null,400);

      const resp = await this.prisma.user.create({
        data: {
          UserName: req.UserName,
          GitHubAccountName: req.GitHubAccountName,
          Nrc: req.Nrc,
          MobileNo: req.MobileNo,
        },
      });

      return ResultService.Success(resp);
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }

  async updateUser(userCode: string, req: UpdateUserRequestDto) {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          UserCode: userCode,
        },
      });
      // prettier-ignore
      if (!existingUser) return ResultService.NotFoundError('User not found!', null, 404);

      const updatedUser = await this.prisma.user.update({
        where: { UserCode: userCode },
        data: {
          UserName: req.UserName,
          GitHubAccountName: req.GitHubAccountName,
          Nrc: req.Nrc,
          MobileNo: req.MobileNo,
        },
      });

      return ResultService.Success(updatedUser);
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }

  async deleteUser(userCode: string) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { UserCode: userCode },
      });
      // prettier-ignore
      if (!existingUser) return ResultService.NotFoundError('User not found!', null, 404);

      await this.prisma.user.delete({ where: { UserCode: userCode } });

      return ResultService.Success(null, 'User deleted successfully');
    } catch (error) {
      return ResultService.SystemError(error.message, null, 500);
    }
  }
}
