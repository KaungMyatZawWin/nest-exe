import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto, UpdateUserRequestDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Get(':userCode')
  getUserById(@Param('userCode') userCode: string){
    return this.userService.getUserById(userCode);
  }

  @Post()
  createUser(@Body() dto: CreateUserRequestDto) {
    return this.userService.createUser(dto);
  }

  @Put(':userCode')
  updateUser(@Param('userCode') userCode: string,@Body() dto: UpdateUserRequestDto){
    return this.userService.updateUser(userCode,dto)
  }

  @Delete(':userCode')
  deleteUser(@Param('userCode') userCode: string){
    return this.userService.deleteUser(userCode);
  }
}
