"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionCancelledError = void 0;
class SubscriptionCancelledError extends Error {
    constructor() {
        super(`Subscription cancelled, Subscribe to a plan to gain access`);
        this.name = 'SubscriptionCancelledError';
    }
}
exports.SubscriptionCancelledError = SubscriptionCancelledError;
