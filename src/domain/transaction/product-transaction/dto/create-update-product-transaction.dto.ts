import { TransactionType } from "@prisma/client";
import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateUpdateProductTransactionDto {
    @IsNumber()
    userId: number;

    @IsString()
    type: TransactionType;

    @IsArray()
    products: { productId: number, quantity: number, sumPrice: number }[];
}
