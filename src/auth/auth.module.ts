import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports: [
    JwtModule.register({
      secret: "thisisjwtsecretkey",
      signOptions: { expiresIn: '60s' },
    })
  ]
})
export class AuthModule {}
