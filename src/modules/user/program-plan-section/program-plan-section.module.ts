import { Module } from '@nestjs/common';
import { ProgramPlanSectionService } from './program-plan-section.service';
import { ProgramPlanSectionResolver } from './program-plan-section.resolver';

@Module({
  providers: [ProgramPlanSectionService, ProgramPlanSectionResolver],
})
export class ProgramPlanSectionModule {}
