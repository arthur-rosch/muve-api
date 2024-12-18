export class SubscriptionPausedError extends Error {
  constructor() {
    super('Subscription paused.');
    this.name = 'SubscriptionPausedError';
  }
}
