import { Module } from '@nestjs/common';
import { ProgramPlanService } from './program-plan.service';
import { ProgramPlanResolver } from './program-plan.resolver';

@Module({
  providers: [ProgramPlanService, ProgramPlanResolver],
})
export class ProgramPlanModule {}
