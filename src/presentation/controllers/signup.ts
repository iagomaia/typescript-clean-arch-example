import { IAddUser } from '../../domain/useCases/add-user'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, internalServerError } from '../helpers/http.helpers'
import { IController, IValidator, IHttpRequest, IHttpResponse } from '../protocols'

export class SignUpController implements IController {
  constructor (
    private readonly emailValidator: IValidator,
    private readonly addUser: IAddUser
  ) { }

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      const body = httpRequest.body
      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { password, passwordConfirmation, name, email } = body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation', 'Passwords don\'t match'))
      }
      if (!this.emailValidator.isValid(email ?? '')) {
        return badRequest(new InvalidParamError('email', 'invalid email address format'))
      }
      const user = this.addUser.add({
        name,
        email,
        password
      })
      return {
        statusCode: 200,
        body: 'Ok'
      }
    } catch (error) {
      console.error(error)
      return internalServerError()
    }
  }
}
