import { Module } from '@nestjs/common';
import { DbhelperService } from './dbhelper.service';

@Module({
  providers: [DbhelperService],
  exports: [DbhelperService]
})
export class DbhelperModule {}
