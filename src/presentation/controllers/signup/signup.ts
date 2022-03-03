import { IAddUser, IController, IHttpRequest, IHttpResponse, IValidator } from './signup.protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, created, internalServerError } from '../../helpers/http.helpers'

export class SignUpController implements IController {
  constructor (
    private readonly emailValidator: IValidator,
    private readonly addUser: IAddUser
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
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
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email', 'invalid email address format'))
      }
      const user = await this.addUser.add({
        name,
        email,
        password
      })
      return created(user)
    } catch (error) {
      return internalServerError(error)
    }
  }
}
