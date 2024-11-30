export class EmailVerificationNotFoundError extends Error {
  constructor() {
    super('Email verification not found or not verified.')
    this.name = 'EmailVerificationNotFoundError'
  }
}
