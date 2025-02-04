import { Module } from '@nestjs/common';
import { UserAuthController } from './auth.controller';
import { UserAuthService } from './auth.service';
import { UserAuthResolver } from './auth.resolver';

@Module({
  controllers: [UserAuthController],
  providers: [UserAuthResolver, UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
