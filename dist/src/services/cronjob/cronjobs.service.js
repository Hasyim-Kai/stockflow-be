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
exports.CronjobsService = void 0;
const invoice_transaction_service_1 = require("../../domain/transaction/invoice/invoice-transaction.service");
const product_transaction_service_1 = require("../../domain/transaction/product-transaction/product-transaction.service");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const whatsapp_api_service_1 = require("../whatsapp-api/whatsapp-api.service");
let CronjobsService = class CronjobsService {
    constructor(transactionProductService, transactionInvoiceService, whatsappApi) {
        this.transactionProductService = transactionProductService;
        this.transactionInvoiceService = transactionInvoiceService;
        this.whatsappApi = whatsappApi;
    }
    async checkOutletWithNoTransactionsPast3Days() {
        try {
            const outlets = await this.transactionProductService.getAllOutletWithNoTransactionsPastThreeDays();
            const outletAlertMsg = this.transactionProductService.generateTextAlertForOutletWithNoTransactionsPastThreeDays(outlets);
            await this.whatsappApi.sendMessage(`089602602683`, outletAlertMsg);
        }
        catch (error) {
            console.error(error.message);
        }
    }
    async invoiceTransactionOnEachOutletEvery3Days() {
        await this.transactionInvoiceService.generateInvoiceForAllNotInvoicedTransactions();
    }
};
exports.CronjobsService = CronjobsService;
__decorate([
    (0, schedule_1.Cron)(`0 9 */3 * *`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronjobsService.prototype, "checkOutletWithNoTransactionsPast3Days", null);
__decorate([
    (0, schedule_1.Cron)(`0 9 */3 * *`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronjobsService.prototype, "invoiceTransactionOnEachOutletEvery3Days", null);
exports.CronjobsService = CronjobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_transaction_service_1.ProductTransactionService,
        invoice_transaction_service_1.InvoiceTransactionService,
        whatsapp_api_service_1.WhatsappApiService])
], CronjobsService);
//# sourceMappingURL=cronjobs.service.js.map