"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LateSubscriptionError = void 0;
class LateSubscriptionError extends Error {
    constructor() {
        super(`Late Subscription. Renew your plan to gain access`);
        this.name = 'LateSubscriptionError';
    }
}
exports.LateSubscriptionError = LateSubscriptionError;
