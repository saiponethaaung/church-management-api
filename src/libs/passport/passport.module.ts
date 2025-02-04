import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserAuthModule } from 'src/modules/user/auth/auth.module';
import { UserJwtStrategy } from './user/user-jwt.strategy';

@Global()
@Module({
  imports: [PassportModule, UserAuthModule],
  providers: [UserJwtStrategy],
  exports: [UserJwtStrategy],
})
export class AuthPassportModule {}
