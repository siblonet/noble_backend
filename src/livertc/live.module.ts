import { Module, } from '@nestjs/common';
import { LiveGateway } from './live.gateway';
import { LiveController } from './live.controller';

@Module({
  imports: [
  ],
  controllers: [LiveController],
  providers: [LiveGateway],
})
export class LiveModule { }