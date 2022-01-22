import { InternalServerError } from '../errors/internal-server.error'
import { IHttpResponse } from '../protocols/http'

export const badRequest = (error: Error): IHttpResponse => ({ statusCode: 400, body: error })
export const internalServerError = (): IHttpResponse => ({ statusCode: 500, body: new InternalServerError() })
