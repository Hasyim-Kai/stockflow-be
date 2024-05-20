import { AuthGuard } from '@/auth/auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TestingWapiDto } from './dto';
import { WhatsappApiService } from './whatsapp-api.service';

@UseGuards(AuthGuard)
@Controller('api/wapi')
export class WhatsappApiController {
  constructor(private wapi: WhatsappApiService) { }


}
