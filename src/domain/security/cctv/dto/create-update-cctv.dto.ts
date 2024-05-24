import { QuantityUnit } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUpdateSecurityCctvDto {
    @IsString()
    name: string;

    @IsString()
    link: string;

    @IsString()
    outletId: number;
}