import { QuantityUnit } from "@prisma/client";
import { IsDecimal, IsString, IsNumber, IsBoolean, IsOptional } from "class-validator";

export class CreateUpdateProductDto {
    @IsString()
    productCode: string;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;

    @IsString()
    quantityUnit: QuantityUnit;

    @IsString()
    description: string;

    @IsBoolean()
    @IsOptional()
    isSealOpened: boolean;
}