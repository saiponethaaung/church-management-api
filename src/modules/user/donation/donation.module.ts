import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationResolver } from './donation.resolver';

@Module({
  providers: [DonationService, DonationResolver],
  exports: [DonationService],
})
export class DonationModule {}
