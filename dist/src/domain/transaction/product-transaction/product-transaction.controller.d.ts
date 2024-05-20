import { ProductTransactionService } from './product-transaction.service';
import { CreateUpdateProductTransactionDto } from './dto/create-update-product-transaction.dto';
import { JwtPayloadType } from '@/auth/dto/jwt-payload';
export declare class ProductTransactionController {
    private readonly productTransactionService;
    constructor(productTransactionService: ProductTransactionService);
    create(createProductTransactionDto: CreateUpdateProductTransactionDto, user: JwtPayloadType): Promise<{
        id: number;
        totalPrice: number;
        type: import(".prisma/client").$Enums.TransactionType;
        isInvoiced: import(".prisma/client").$Enums.YesNoType;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        outletId: number;
        invoiceId: number;
    }>;
    findAll(user: JwtPayloadType): Promise<{
        id: number;
        totalPrice: number;
        type: import(".prisma/client").$Enums.TransactionType;
        isInvoiced: import(".prisma/client").$Enums.YesNoType;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        outletId: number;
        invoiceId: number;
    }[]>;
    getAllOutletWithNoTransactionsPastThreeDays(): Promise<import("./dto/return-type").OutletWithNoTransactionsPastThreeDaysDto[]>;
    findOne(id: string): Promise<{
        id: number;
        totalPrice: number;
        type: import(".prisma/client").$Enums.TransactionType;
        isInvoiced: import(".prisma/client").$Enums.YesNoType;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        outletId: number;
        invoiceId: number;
    }>;
}
