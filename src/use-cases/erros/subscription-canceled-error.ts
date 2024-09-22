export class SubscriptionCancelledError extends Error {
  constructor() {
    super(`Subscription cancelled, Subscribe to a plan to gain access`)
    this.name = 'SubscriptionCancelledError'
  }
}
