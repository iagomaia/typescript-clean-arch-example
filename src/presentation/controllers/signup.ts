import { MissingParamError } from '../errors/missing-param.error'
import { badRequest } from '../helpers/http.helpers'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest<any>): HttpResponse<any> {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    const { body } = httpRequest
    for (const field of requiredFields) {
      if (!body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    if (body.password !== body.passwordConfirmation) {
      return badRequest(new Error('Passwords don\'t match'))
    }
    return {
      statusCode: 200,
      body: 'Ok'
    }
  }
}
