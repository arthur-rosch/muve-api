"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimestamp = formatTimestamp;
function formatTimestamp(timestamp) {
    return timestamp ? new Date(timestamp * 1000).toISOString() : null;
}
