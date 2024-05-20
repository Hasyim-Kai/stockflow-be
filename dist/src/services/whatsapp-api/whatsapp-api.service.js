"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappApiService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WhatsappApiService = class WhatsappApiService {
    constructor(prisma) {
        this.prisma = prisma;
        this.watsap = axios_1.default.create({
            baseURL: 'https://wapi.sentium.id/api',
            headers: {
                'X-Api-Key': 'supersecretrizalfauziwahyu',
            },
        });
    }
    async sendMessage(phone, message, session = 'sistem') {
        try {
            await this.watsap.post('/sendText', {
                chatId: `${phone.replace(/^0/, '62')}@c.us`,
                text: message,
                session: session,
            });
            return {
                status: 'OK',
            };
        }
        catch (err) {
            throw err;
        }
    }
    async sendMessageToAdmin(message, session = 'sistem') {
        try {
            await this.watsap.post('/sendText', {
                chatId: `${6289602602683}@c.us`,
                text: message,
                session: session,
            });
            return {
                status: 'OK',
            };
        }
        catch (err) {
            throw err;
        }
    }
};
exports.WhatsappApiService = WhatsappApiService;
exports.WhatsappApiService = WhatsappApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WhatsappApiService);
//# sourceMappingURL=whatsapp-api.service.js.map