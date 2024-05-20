import { QuantityUnit } from "@prisma/client";
export declare class CreateUpdateProductDto {
    productCode: string;
    name: string;
    price: number;
    sealedQuantity: number;
    openedQuantity: number;
    quantityUnit: QuantityUnit;
    description: string;
    outletId: number;
}
