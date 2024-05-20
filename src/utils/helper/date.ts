const moment = require("moment");

export const formatDate = (date: Date, format = `MM-DD-YYYY, HH:mm`) => moment(date).format(format)