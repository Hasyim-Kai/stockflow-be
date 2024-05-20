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
exports.InvoiceTransactionService = void 0;
const prisma_service_1 = require("../../../services/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
let InvoiceTransactionService = class InvoiceTransactionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(user) {
        try {
            const invoices = await this.prisma.invoice.findMany({
                where: { outletId: user.outletId },
            });
            return invoices;
        }
        catch (error) {
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const invoices = await this.prisma.invoice.findUnique({
                where: { id },
                include: {
                    outlet: {
                        select: {
                            address: true, name: true
                        }
                    },
                    transaction: {
                        include: {
                            user: true,
                            transactionProducts: {
                                include: {
                                    product: {
                                        select: {
                                            name: true, price: true, productCode: true
                                        }
                                    }
                                }
                            },
                        }
                    }
                },
            });
            return invoices;
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
    async generateInvoiceForAllNotInvoicedTransactions() {
        try {
            await this.prisma.$transaction(async (tx) => {
                const outletIdWithNotInvoicedOutTransactions = await tx.transaction.groupBy({
                    by: [`outletId`],
                    where: {
                        type: 'OUT',
                        isInvoiced: 'NO',
                    },
                });
                await Promise.all(outletIdWithNotInvoicedOutTransactions.map(async (outlet) => {
                    const outletsNotInvoicedOutTransactions = await tx.transaction.findMany({
                        where: {
                            outletId: outlet.outletId,
                            isInvoiced: 'NO',
                            type: 'OUT'
                        },
                    });
                    const newInvoice = await tx.invoice.create({
                        data: {
                            outletId: outlet.outletId,
                            invoiceGrandTotalPrice: outletsNotInvoicedOutTransactions.reduce((total, current) => total + current.totalPrice, 0),
                        }
                    });
                    await tx.transaction.updateMany({
                        where: {
                            outletId: outlet.outletId,
                            isInvoiced: 'NO',
                            type: 'OUT'
                        },
                        data: {
                            invoiceId: newInvoice.id,
                            isInvoiced: 'YES'
                        }
                    });
                }));
            });
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
exports.InvoiceTransactionService = InvoiceTransactionService;
exports.InvoiceTransactionService = InvoiceTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoiceTransactionService);
//# sourceMappingURL=invoice-transaction.service.js.map