import { InternalServerError } from '../errors'
import { IHttpResponse } from '../protocols/http'

export const badRequest = (error: Error): IHttpResponse => ({ statusCode: 400, body: error })
export const internalServerError = (error: Error): IHttpResponse => ({ statusCode: 500, body: new InternalServerError(error.stack) })
export const created = (body: any): IHttpResponse => ({ statusCode: 201, body })
