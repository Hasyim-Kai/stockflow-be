import { Module } from '@nestjs/common';
import { WhatsappApiService } from './whatsapp-api.service';
import { WhatsappApiController } from './whatsapp-api.controller';
import { ProductTransactionService } from '@/domain/transaction/product-transaction/product-transaction.service';

@Module({
  providers: [
    WhatsappApiService,
    ProductTransactionService,
  ],
  controllers: [WhatsappApiController]
})
export class WhatsappApiModule { }
