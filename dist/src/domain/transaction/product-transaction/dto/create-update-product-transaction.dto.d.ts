import { TransactionType } from "@prisma/client";
export declare class CreateUpdateProductTransactionDto {
    type: TransactionType;
    products: {
        productId: number;
        quantity: number;
        sumPrice: number;
    }[];
}
