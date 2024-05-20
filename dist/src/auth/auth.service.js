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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../services/prisma/prisma.service");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService, config, prisma) {
        this.jwtService = jwtService;
        this.config = config;
        this.prisma = prisma;
    }
    async signIn(email, password) {
        try {
            const user = await this.prisma.user.findFirst({ where: { email } });
            if (!user) {
                throw new common_1.NotFoundException(`User with email ${email} not found`);
            }
            const isPasswordCorrect = await (0, bcrypt_1.compare)(password, user.password);
            if (!isPasswordCorrect) {
                throw new common_1.UnauthorizedException(`Wrong password`);
            }
            const payload = { userId: user.id, name: user.name, email: user.email, role: user.role, outletId: user.outletId };
            return {
                userId: user.id, name: user.name, email: user.email, role: user.role,
                token: await this.jwtService.signAsync(payload),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async verifyJwt(token) {
        try {
            const decoded = await this.jwtService.verify(token, {
                secret: this.config.get('JWT_SECRET'),
            });
            return decoded;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid JWT token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map