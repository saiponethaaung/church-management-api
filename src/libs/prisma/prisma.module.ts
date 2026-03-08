import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ChurchRepo } from './repo/church.repo';
import { UserRepo } from './repo/user.repo';
import { ChurchMemberRepo } from './repo/church-member.repo';
import { HouseholdRepo } from './repo/household.repo';
import { ProgramTypeRepo } from './repo/program-type.repo';

import { ProgramRepo } from './repo/program.repo';
import { ProgramPlanRepo } from './repo/program-plan.repo';
import { ProgramPlanSectionRepo } from './repo/program-plan-section.repo';
import { ProgramPlanSectionProposalRepo } from './repo/program-plan-section-proposal.repo';
import { AnnouncementRepo } from './repo/announcement.repo';
import { DonationTypeRepo as RepoDonationType } from './repo/donation-type.repo';
import { DonationRepo as RepoDonation } from './repo/donation.repo';

import { DonationTypeRepo } from './repo/donation-type.repo';
import { DonationRepo } from './repo/donation.repo';

@Global()
@Module({
  providers: [
    PrismaService,
    ChurchRepo,
    UserRepo,
    ChurchMemberRepo,
    HouseholdRepo,
    ProgramTypeRepo,
    ProgramRepo,
    ProgramPlanRepo,
    ProgramPlanSectionRepo,
    ProgramPlanSectionProposalRepo,
    AnnouncementRepo,
    DonationTypeRepo,
    DonationRepo,
  ],
  exports: [
    PrismaService,
    ChurchRepo,
    UserRepo,
    ChurchMemberRepo,
    HouseholdRepo,
    ProgramTypeRepo,
    ProgramRepo,
    ProgramPlanRepo,
    ProgramPlanSectionRepo,
    ProgramPlanSectionProposalRepo,
    AnnouncementRepo,
    DonationTypeRepo,
    DonationRepo,
  ],
})
export class PrismaModule {}
