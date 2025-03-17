import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
   async singup(@Body() dto: SignUpRequestDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
   async signin(@Body() dto:SignInRequestDto) {
    return this.authService.singin(dto);
  }
}
