import { TransactionType } from "@prisma/client";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUpdateInvoiceTransactionDto {
    @IsString()
    type: TransactionType;

    @IsArray()
    products: { productId: number, quantity: number, sumPrice: number }[];
}
