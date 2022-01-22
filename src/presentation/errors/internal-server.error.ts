export class InternalServerError extends Error {
  constructor () {
    super('An unexpected error ocurred with the server')
    this.name = 'InternalServerError'
  }
}
