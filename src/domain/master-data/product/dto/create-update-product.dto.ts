import { QuantityUnit } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUpdateProductDto {
    @IsString()
    productCode: string;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    @IsOptional()
    sealedQuantity: number;

    @IsNumber()
    @IsOptional()
    openedQuantity: number;

    @IsString()
    quantityUnit: QuantityUnit;

    @IsString()
    description: string;
}