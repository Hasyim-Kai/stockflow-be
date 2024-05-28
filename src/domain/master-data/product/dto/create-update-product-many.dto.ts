import { QuantityUnit } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CreateUpdateProductDto } from "./create-update-product.dto";

export class CreateUpdateProductManyDto {
    @IsString()
    products: CreateUpdateProductDto[];
}