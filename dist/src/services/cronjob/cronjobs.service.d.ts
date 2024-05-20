import { InvoiceTransactionService } from '@/domain/transaction/invoice/invoice-transaction.service';
import { ProductTransactionService } from '@/domain/transaction/product-transaction/product-transaction.service';
import { WhatsappApiService } from '../whatsapp-api/whatsapp-api.service';
export declare class CronjobsService {
    private transactionProductService;
    private transactionInvoiceService;
    private whatsappApi;
    constructor(transactionProductService: ProductTransactionService, transactionInvoiceService: InvoiceTransactionService, whatsappApi: WhatsappApiService);
    checkOutletWithNoTransactionsPast3Days(): Promise<void>;
    invoiceTransactionOnEachOutletEvery3Days(): Promise<void>;
}
