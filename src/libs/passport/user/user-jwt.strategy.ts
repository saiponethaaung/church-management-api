import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserAuthService } from 'src/modules/user/auth/auth.service';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
// import { Request } from 'express';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(private readonly userAuthService: UserAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: (req) => {
      // console.log('cookie', req.cookies);
      // console.log('headers', req.headers.authorization);

      // return req.headers.authorization.split(" ")[1];
      // },
      ignoreExpiration: false,
      secretOrKey: '10',
      passReqToCallback: true,
    });
  }

  async validate(payload: any) {
    const user = await this.userAuthService.profile({
      id: payload.id,
      email: payload.email,
    });

    if (!user) {
      throw new HandledExceptionFilter(
        {
          errorCode: 'unauthorized',
          message: 'Unauthorized',
        },
        401,
      );
    }

    return user;
  }
}
