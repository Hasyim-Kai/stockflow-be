"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const moment = require("moment");
const formatDate = (date, format = `MM-DD-YYYY, HH:mm`) => moment(date).format(format);
exports.formatDate = formatDate;
//# sourceMappingURL=date.js.map