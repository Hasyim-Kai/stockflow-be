import { IsString } from "class-validator";

export class OutletWithNoTransactionsPastThreeDaysDto {
    @IsString()
    name: string;

    @IsString()
    address: string;
}
