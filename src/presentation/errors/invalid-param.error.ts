export class InvalidParamError extends Error {
  constructor (param: string, reason: string) {
    super(`Invalid ${param}: ${reason}`)
    this.name = 'InvalidParamError'
  }
}
