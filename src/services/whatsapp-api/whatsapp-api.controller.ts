import { AuthGuard } from '@/auth/auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WhatsappApiService } from './whatsapp-api.service';
import { TestingWapiDto } from './dto';

@UseGuards(AuthGuard)
@Controller('wa')
export class WhatsappApiController {
  constructor(private wapi: WhatsappApiService) { }

  @Post(`experimental`)
  create(@Body() dto: TestingWapiDto) {
    return this.wapi.sendMessageToAdminOutletWithNoTransactionsPast3Days(dto.whatsappNumber);
  }
}
