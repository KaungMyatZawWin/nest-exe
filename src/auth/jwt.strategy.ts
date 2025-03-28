
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "thisisjwtsecretkey",
    });
  }

  async validate(payload: any) {
    console.log("checking payload inside jwt strategy--> ",payload);
    return { userId: payload.sub, username: payload.username };
  }
}
