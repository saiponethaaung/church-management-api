import { Module } from '@nestjs/common';
import { UserAuthModule } from './auth/auth.module';
import { ChurchModule } from './chruch/church.module';
import { MemberModule } from './member/member.module';

@Module({ imports: [UserAuthModule, ChurchModule, MemberModule] })
export class UserCommonModule {}
