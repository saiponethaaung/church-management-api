import { Module } from '@nestjs/common';
import { UserAuthModule } from './auth/auth.module';
import { ChurchModule } from './chruch/church.module';
import { MemberModule } from './member/member.module';
import { HouseholdModule } from './household/household.module';
import { ProgramTypeModule } from './program-type/program-type.module';
import { ProgramModule } from './program/program.module';
import { ProgramPlanModule } from './program-plan/program-plan.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { DonationTypeModule } from './donation-type/donation-type.module';
import { DonationModule } from './donation/donation.module';
import { MemberTypeModule } from './member-type/member-type.module';

@Module({
  imports: [
    UserAuthModule,
    ChurchModule,
    MemberModule,
    HouseholdModule,
    MemberTypeModule,
    ProgramTypeModule,
    ProgramModule,
    ProgramPlanModule,
    AnnouncementModule,
    DonationTypeModule,
    DonationModule,
  ],
})
export class UserCommonModule {}
