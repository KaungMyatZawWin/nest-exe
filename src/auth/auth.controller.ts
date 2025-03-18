import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RefreshTokenRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signup(@Body() dto: SignUpRequestDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  async signin(@Body() dto: SignInRequestDto) {
    return this.authService.signin(dto);
  }

  @Post('/signout')
  async signout(@Body() dto: RefreshTokenRequestDto) {
    return this.authService.signout(dto);
  }

  @Post('/refresh')
  async refresh(@Body() dto: RefreshTokenRequestDto) {
    return this.authService.refresh(dto);
  }
}
