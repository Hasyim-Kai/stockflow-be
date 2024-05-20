import { PrismaService } from '../prisma/prisma.service';
export declare class WhatsappApiService {
    private prisma;
    constructor(prisma: PrismaService);
    private watsap;
    sendMessage(phone: string, message: string, session?: string): Promise<{
        status: string;
    }>;
    sendMessageToAdmin(message: string, session?: string): Promise<{
        status: string;
    }>;
}
