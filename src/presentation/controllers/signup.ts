import { SignupRequest } from '../dtos/signup.req.dto'
import { InternalServerError } from '../errors/internal-server.error'
import { InvalidParamError } from '../errors/invalid-param.error'
import { MissingParamError } from '../errors/missing-param.error'
import { badRequest } from '../helpers/http.helpers'
import { IController } from '../protocols/controller'
import { IHttpRequest, IHttpResponse } from '../protocols/http'
import { IValidator } from '../protocols/validator'

export class SignUpController implements IController {
  constructor (private readonly emailValidator: IValidator) { }

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
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
      if (!this.emailValidator.isValid(body.email ?? '')) {
        return badRequest(new InvalidParamError('email', 'invalid email address format'))
      }
      return {
        statusCode: 200,
        body: 'Ok'
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: new InternalServerError()
      }
    }
  }
}
