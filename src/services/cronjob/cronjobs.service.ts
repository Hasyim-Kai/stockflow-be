import { InvoiceTransactionService } from '@/domain/transaction/invoice/invoice-transaction.service';
import { ProductTransactionService } from '@/domain/transaction/product-transaction/product-transaction.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WhatsappApiService } from '../whatsapp-api/whatsapp-api.service';
import { formatDate } from '@/utils/helper/date';

@Injectable()
export class CronjobsService {
    constructor(
        private transactionProductService: ProductTransactionService,
        private transactionInvoiceService: InvoiceTransactionService,
        private whatsappApi: WhatsappApiService,
    ) { }

    @Cron(`0 9 */3 * *`) // every 3 days at 9 am
    async checkOutletWithNoTransactionsPast3Days() {
        try {
            const outlets = await this.transactionProductService.getAllOutletWithNoTransactionsPastThreeDays()
            const outletAlertMsg = this.transactionProductService.generateTextAlertForOutletWithNoTransactionsPastThreeDays(outlets)
            await this.whatsappApi.sendMessage(`089602602683`, outletAlertMsg)
        } catch (error) {
            console.error(error.message)
        }
    }

    @Cron(`0 9 */3 * *`) // every 3 days at 9 am
    async invoiceTransactionOnEachOutletEvery3Days() {
        await this.transactionInvoiceService.generateInvoiceForAllNotInvoicedTransactions()
    }
}
