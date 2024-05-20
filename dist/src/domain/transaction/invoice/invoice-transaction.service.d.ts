import { PrismaService } from '@/services/prisma/prisma.service';
import { Invoice } from '@prisma/client';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
export declare class InvoiceTransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(user: JwtPayloadType): Promise<Invoice[]>;
    findOne(id: number): Promise<Invoice | null>;
    generateInvoiceForAllNotInvoicedTransactions(): Promise<void>;
}
