import { Module } from '@nestjs/common';
import { ProgramPlanProposalService } from './program-plan-proposal.service';
import { ProgramPlanProposalResolver } from './program-plan-proposal.resolver';

@Module({
  providers: [ProgramPlanProposalService, ProgramPlanProposalResolver],
})
export class ProgramPlanProposalModule {}
