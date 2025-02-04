import { Module } from '@nestjs/common';
import { UserCommonModule } from './user/user-common.module';

@Module({
  imports: [UserCommonModule],
})
export class CommonModule {}
