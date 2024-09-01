export class NotFoundErros extends Error {
  constructor(text: string) {
    super(`${text} not found`)
  }
}
