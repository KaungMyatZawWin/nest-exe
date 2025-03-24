import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RefreshTokenRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
} from './dto';
import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

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

  @UseGuards(AuthGuard("jwt"))
  @Post('/signout')
  async signout(@Body() dto: RefreshTokenRequestDto) {
    return this.authService.signout(dto);
  }

  @Post('/refresh')
  refresh(@Body() dto: RefreshTokenRequestDto) {
    return this.authService.refresh(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/test')
  testing(){
    return {Message:'Testing Jwt Auth middleware'}
  }
}
