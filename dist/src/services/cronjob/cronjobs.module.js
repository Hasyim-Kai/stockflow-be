"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobsModule = void 0;
const common_1 = require("@nestjs/common");
const cronjobs_service_1 = require("./cronjobs.service");
const product_transaction_service_1 = require("../../domain/transaction/product-transaction/product-transaction.service");
const invoice_transaction_service_1 = require("../../domain/transaction/invoice/invoice-transaction.service");
const whatsapp_api_service_1 = require("../whatsapp-api/whatsapp-api.service");
let CronjobsModule = class CronjobsModule {
};
exports.CronjobsModule = CronjobsModule;
exports.CronjobsModule = CronjobsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            cronjobs_service_1.CronjobsService,
            whatsapp_api_service_1.WhatsappApiService,
            product_transaction_service_1.ProductTransactionService,
            invoice_transaction_service_1.InvoiceTransactionService,
        ],
        exports: [cronjobs_service_1.CronjobsService],
    })
], CronjobsModule);
//# sourceMappingURL=cronjobs.module.js.map