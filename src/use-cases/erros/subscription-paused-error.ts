export class SubscriptionPausedError extends Error {
  constructor() {
    super('Subscription is paused due to overdue next charge date.')
    this.name = 'SubscriptionPausedError'
  }
}
