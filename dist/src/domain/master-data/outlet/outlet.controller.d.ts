import { OutletService } from './outlet.service';
import { CreateUpdateOutletDto } from './dto/create-update-outlet.dto';
export declare class OutletController {
    private readonly outletService;
    constructor(outletService: OutletService);
    create(dto: CreateUpdateOutletDto): Promise<{
        id: number;
        name: string;
        address: string;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        address: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        address: string;
    }>;
    update(id: string, updateOutletDto: CreateUpdateOutletDto): Promise<{
        id: number;
        name: string;
        address: string;
    }>;
    remove(id: string): Promise<void>;
}
