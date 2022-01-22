import { MissingParamError } from '../errors/missing-param.error'
import { badRequest } from '../helpers/http.helpers'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest<any>): HttpResponse<any> {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    return {
      statusCode: 200,
      body: 'Ok'
    }
  }
}
