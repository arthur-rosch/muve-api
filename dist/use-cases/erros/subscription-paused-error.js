"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPausedError = void 0;
class SubscriptionPausedError extends Error {
    constructor() {
        super('Subscription paused.');
        this.name = 'SubscriptionPausedError';
    }
}
exports.SubscriptionPausedError = SubscriptionPausedError;
