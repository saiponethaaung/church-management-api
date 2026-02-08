import { Module } from '@nestjs/common';
import { DonationTypeService } from './donation-type.service';
import { DonationTypeResolver } from './donation-type.resolver';

@Module({
  providers: [DonationTypeService, DonationTypeResolver],
  exports: [DonationTypeService],
})
export class DonationTypeModule {}
