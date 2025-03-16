import { Global, Module } from '@nestjs/common';
import { ResultService } from './result.service';

@Global()
@Module({
  providers: [ResultService],
  exports: [ResultService]
})
export class ModelsModule {}
