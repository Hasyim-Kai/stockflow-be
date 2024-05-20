"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./domain/master-data/user/user.module");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./services/prisma/prisma.module");
const product_module_1 = require("./domain/master-data/product/product.module");
const outlet_module_1 = require("./domain/master-data/outlet/outlet.module");
const product_transaction_module_1 = require("./domain/transaction/product-transaction/product-transaction.module");
const invoice_transaction_module_1 = require("./domain/transaction/invoice/invoice-transaction.module");
const schedule_1 = require("@nestjs/schedule");
const cronjobs_module_1 = require("./services/cronjob/cronjobs.module");
const whatsapp_api_module_1 = require("./services/whatsapp-api/whatsapp-api.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, }),
            schedule_1.ScheduleModule.forRoot(),
            cronjobs_module_1.CronjobsModule,
            whatsapp_api_module_1.WhatsappApiModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            outlet_module_1.OutletModule,
            product_module_1.ProductModule,
            product_transaction_module_1.ProductTransactionModule,
            invoice_transaction_module_1.InvoiceTransactionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map