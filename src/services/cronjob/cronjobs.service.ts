import { InvoiceTransactionService } from '@/domain/transaction/invoice/invoice-transaction.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WhatsappApiService } from '../whatsapp-api/whatsapp-api.service';

@Injectable()
export class CronjobsService {
    constructor(
        private transactionInvoiceService: InvoiceTransactionService,
        private whatsappApi: WhatsappApiService,
    ) { }

    @Cron(`0 9 */3 * *`) // every 3 days at 9 am
    async checkOutletWithNoTransactionsPast3Days() {
        try {
            const adminWhatsappNumber = `089602602683`
            await this.whatsappApi.sendMessageToAdminOutletWithNoTransactionsPast3Days(adminWhatsappNumber)
        } catch (error) {
            console.error(error.message)
        }
    }

    // @Cron(CronExpression.EVERY_10_SECONDS) // every 3 days at 9 am
    @Cron(`0 9 */3 * *`) // every 3 days at 9 am
    async invoiceTransactionOnEachOutletEvery3Days() {
        await this.transactionInvoiceService.generateInvoiceForAllNotInvoicedTransactions()
    }
}
