import { InvoiceTransactionService } from './invoice-transaction.service';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
export declare class InvoiceTransactionController {
    private readonly invoiceTransactionService;
    constructor(invoiceTransactionService: InvoiceTransactionService);
    findAll(user: JwtPayloadType): Promise<{
        id: number;
        createdAt: Date;
        invoiceGrandTotalPrice: number;
        outletId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        invoiceGrandTotalPrice: number;
        outletId: number;
    }>;
}
