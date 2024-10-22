export class LateSubscriptionError extends Error {
  constructor() {
    super(`Late Subscription. Renew your plan to gain access`)
    this.name = 'LateSubscriptionError'
  }
}
