"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutletModule = void 0;
const common_1 = require("@nestjs/common");
const outlet_service_1 = require("./outlet.service");
const outlet_controller_1 = require("./outlet.controller");
let OutletModule = class OutletModule {
};
exports.OutletModule = OutletModule;
exports.OutletModule = OutletModule = __decorate([
    (0, common_1.Module)({
        controllers: [outlet_controller_1.OutletController],
        providers: [outlet_service_1.OutletService],
        exports: [outlet_service_1.OutletService],
    })
], OutletModule);
//# sourceMappingURL=outlet.module.js.map