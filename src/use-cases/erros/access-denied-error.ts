export class AccessDeniedError extends Error {
  constructor(resource: string) {
    super(`Access denied to ${resource}`)
    this.name = 'AccessDeniedError'
  }
}
