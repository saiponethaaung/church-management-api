import { Module } from '@nestjs/common';
import { HouseholdService } from './household.service';
import { HouseholdResolver } from './household.resolver';

@Module({
  providers: [HouseholdService, HouseholdResolver],
  exports: [HouseholdService],
})
export class HouseholdModule {}
