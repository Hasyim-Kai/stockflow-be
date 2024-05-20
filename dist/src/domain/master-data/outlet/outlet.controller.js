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
exports.OutletController = void 0;
const common_1 = require("@nestjs/common");
const outlet_service_1 = require("./outlet.service");
const create_update_outlet_dto_1 = require("./dto/create-update-outlet.dto");
const auth_guard_1 = require("../../../auth/auth.guard");
let OutletController = class OutletController {
    constructor(outletService) {
        this.outletService = outletService;
    }
    create(dto) {
        return this.outletService.create(dto);
    }
    findAll() {
        return this.outletService.findAll();
    }
    findOne(id) {
        return this.outletService.findOne(+id);
    }
    update(id, updateOutletDto) {
        return this.outletService.update(+id, updateOutletDto);
    }
    remove(id) {
        return this.outletService.remove(+id);
    }
};
exports.OutletController = OutletController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_update_outlet_dto_1.CreateUpdateOutletDto]),
    __metadata("design:returntype", void 0)
], OutletController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OutletController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OutletController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_update_outlet_dto_1.CreateUpdateOutletDto]),
    __metadata("design:returntype", void 0)
], OutletController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OutletController.prototype, "remove", null);
exports.OutletController = OutletController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('outlet'),
    __metadata("design:paramtypes", [outlet_service_1.OutletService])
], OutletController);
//# sourceMappingURL=outlet.controller.js.map