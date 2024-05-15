import { TransactionType } from "@prisma/client";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUpdateProductTransactionDto {
    @IsString()
    type: TransactionType;

    @IsArray()
    products: { productId: number, quantity: number, sumPrice: number }[];

    @IsString()
    @IsOptional()
    outletId: number;
}
