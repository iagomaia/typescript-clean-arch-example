import { SignupRequest } from '../dtos/signup.req.dto'
import { MissingParamError } from '../errors/missing-param.error'
import { badRequest } from '../helpers/http.helpers'
import { IController } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements IController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    const body = httpRequest.body as SignupRequest
    if (!body) {
      return badRequest(new Error('Empty body!'))
    }
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
