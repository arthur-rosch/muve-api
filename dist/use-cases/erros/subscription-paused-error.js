"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPausedError = void 0;
class SubscriptionPausedError extends Error {
    constructor() {
        super('Subscription is paused due to overdue next charge date.');
        this.name = 'SubscriptionPausedError';
    }
}
exports.SubscriptionPausedError = SubscriptionPausedError;
