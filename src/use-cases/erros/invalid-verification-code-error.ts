export class InvalidVerificationCodeError extends Error {
  constructor() {
    super('Código inválido ou email não encontrado.')
    this.name = 'InvalidVerificationCodeError'
  }
}
