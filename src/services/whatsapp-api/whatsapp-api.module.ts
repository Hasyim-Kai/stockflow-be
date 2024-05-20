import { Module } from '@nestjs/common';
import { WhatsappApiService } from './whatsapp-api.service';
import { WhatsappApiController } from './whatsapp-api.controller';

@Module({
  providers: [WhatsappApiService],
  controllers: [WhatsappApiController]
})
export class WhatsappApiModule {}
