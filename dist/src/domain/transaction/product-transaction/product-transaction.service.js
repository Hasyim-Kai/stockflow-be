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
exports.ProductTransactionService = void 0;
const prisma_service_1 = require("../../../services/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
let ProductTransactionService = class ProductTransactionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, currentUser) {
        try {
            let transaction;
            await this.prisma.$transaction(async (tx) => {
                transaction = await tx.transaction.create({
                    data: {
                        userId: currentUser.userId,
                        outletId: currentUser.outletId,
                        totalPrice: dto.products.reduce((total, product) => total + product.sumPrice, 0),
                        type: dto.type,
                        transactionProducts: {
                            createMany: {
                                data: dto.products.map((product) => ({
                                    quantity: product.quantity,
                                    productId: product.productId,
                                    sumPrice: product.sumPrice
                                }))
                            }
                        },
                    },
                });
                await Promise.all(dto.products.map(async (product) => {
                    const dataUpdate = dto.type === 'IN' ? {
                        sealedQuantity: {
                            increment: product.quantity
                        }
                    }
                        : dto.type === 'OUT' ? {
                            openedQuantity: {
                                increment: product.quantity
                            },
                            sealedQuantity: {
                                decrement: product.quantity
                            }
                        }
                            : null;
                    await tx.product.update({
                        where: { id: product.productId },
                        data: dataUpdate
                    });
                }));
            });
            return transaction;
        }
        catch (error) {
            console.log(error);
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.HttpException('Selected Product Cannot be Same', common_1.HttpStatus.BAD_REQUEST);
                }
                else {
                    throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(user) {
        try {
            const transactions = await this.prisma.transaction.findMany({
                where: {
                    outletId: user.outletId
                },
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    },
                },
            });
            return transactions;
        }
        catch (error) {
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const transaction = await this.prisma.transaction.findUnique({
                where: { id },
                include: {
                    user: {
                        select: { name: true }
                    },
                    transactionProducts: {
                        include: {
                            product: {
                                select: {
                                    name: true, price: true, productCode: true
                                }
                            }
                        }
                    }
                },
            });
            return transaction;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException('Record not found');
                }
                else {
                    throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllOutletWithNoTransactionsPastThreeDays() {
        try {
            let allOutletWithTransactionsPastThreeDays, outletWithNoTransactionsPastThreeDays;
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            await this.prisma.$transaction(async (tx) => {
                allOutletWithTransactionsPastThreeDays = await tx.transaction.groupBy({
                    by: [`outletId`],
                    where: {
                        createdAt: {
                            gte: threeDaysAgo
                        }
                    },
                });
                outletWithNoTransactionsPastThreeDays = await tx.outlet.findMany({
                    where: {
                        id: {
                            notIn: allOutletWithTransactionsPastThreeDays.map((outlet) => outlet.outletId)
                        }
                    },
                    select: {
                        name: true, address: true
                    }
                });
            });
            return outletWithNoTransactionsPastThreeDays;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException('Record not found');
                }
                else {
                    throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    generateTextAlertForOutletWithNoTransactionsPastThreeDays(dataInput) {
        try {
            const outlets = `${dataInput.map((outlet) => `- ${outlet.name} (${outlet.address}) \n`)}`;
            return `Outlet With No Transactions\nFrom Konsinyasi Distributor App
      \n${outlets} \nThankyou & Have a nice day!`;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException('Record not found');
                }
                else {
                    throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProductTransactionService = ProductTransactionService;
exports.ProductTransactionService = ProductTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductTransactionService);
//# sourceMappingURL=product-transaction.service.js.map