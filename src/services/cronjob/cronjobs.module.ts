import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { ProductTransactionService } from '@/domain/transaction/product-transaction/product-transaction.service';
import { InvoiceTransactionService } from '@/domain/transaction/invoice/invoice-transaction.service';
import { WhatsappApiService } from '../whatsapp-api/whatsapp-api.service';

@Module({
    providers: [
        CronjobsService,
        WhatsappApiService,
        ProductTransactionService,
        InvoiceTransactionService,
    ],
    exports: [CronjobsService],
})
export class CronjobsModule { }
