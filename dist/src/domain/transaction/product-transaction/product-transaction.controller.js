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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTransactionController = void 0;
const common_1 = require("@nestjs/common");
const product_transaction_service_1 = require("./product-transaction.service");
const create_update_product_transaction_dto_1 = require("./dto/create-update-product-transaction.dto");
const current_user_1 = require("../../../decorator/current-user");
const auth_guard_1 = require("../../../auth/auth.guard");
let ProductTransactionController = class ProductTransactionController {
    constructor(productTransactionService) {
        this.productTransactionService = productTransactionService;
    }
    create(createProductTransactionDto, user) {
        return this.productTransactionService.create(createProductTransactionDto, user);
    }
    findAll(user) {
        return this.productTransactionService.findAll(user);
    }
    getAllOutletWithNoTransactionsPastThreeDays() {
        return this.productTransactionService.getAllOutletWithNoTransactionsPastThreeDays();
    }
    findOne(id) {
        return this.productTransactionService.findOne(+id);
    }
};
exports.ProductTransactionController = ProductTransactionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_update_product_transaction_dto_1.CreateUpdateProductTransactionDto, Object]),
    __metadata("design:returntype", void 0)
], ProductTransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductTransactionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('no-transactions-outlet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductTransactionController.prototype, "getAllOutletWithNoTransactionsPastThreeDays", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductTransactionController.prototype, "findOne", null);
exports.ProductTransactionController = ProductTransactionController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('transaction/product'),
    __metadata("design:paramtypes", [product_transaction_service_1.ProductTransactionService])
], ProductTransactionController);
//# sourceMappingURL=product-transaction.controller.js.map