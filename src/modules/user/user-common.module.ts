import { Module } from '@nestjs/common';
import { UserAuthModule } from './auth/auth.module';
import { ChurchModule } from './chruch/church.module';

@Module({
  imports: [UserAuthModule, ChurchModule],
})
export class UserCommonModule {}
