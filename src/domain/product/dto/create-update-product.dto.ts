import { QuantityUnit } from "@prisma/client";
import { IsDecimal, IsString } from "class-validator";

export class CreateUpdateProductDto {
    @IsString()
    productCode: string;

    @IsString()
    name: string;

    @IsDecimal()
    pricePerMiliLiter: number;

    @IsString()
    quantity: number;

    @IsString()
    quantityUnit: QuantityUnit;

    @IsString()
    description: string;
}