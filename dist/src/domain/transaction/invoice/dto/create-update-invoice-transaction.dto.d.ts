import { TransactionType } from "@prisma/client";
export declare class CreateUpdateInvoiceTransactionDto {
    type: TransactionType;
    products: {
        productId: number;
        quantity: number;
        sumPrice: number;
    }[];
}
