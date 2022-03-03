export class InternalServerError extends Error {
  constructor (stack?: string) {
    super('An unexpected error ocurred with the server')
    this.name = 'InternalServerError'
    this.stack = stack
  }
}
