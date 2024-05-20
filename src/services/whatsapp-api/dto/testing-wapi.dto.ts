import { IsString } from "class-validator";

export class TestingWapiDto {
    @IsString()
    phone: string;

    @IsString()
    message: string;
}