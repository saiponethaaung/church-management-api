import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementResolver } from './announcement.resolver';

@Module({
  providers: [AnnouncementService, AnnouncementResolver],
  exports: [AnnouncementService],
})
export class AnnouncementModule {}
