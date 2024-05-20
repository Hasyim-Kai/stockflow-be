"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '7d' },
};
//# sourceMappingURL=jwt.config.js.map