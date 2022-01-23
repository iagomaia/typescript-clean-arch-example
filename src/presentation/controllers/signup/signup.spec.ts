import { SignUpController } from './signup'
import { MissingParamError, InternalServerError, InvalidParamError } from '../../errors'
import { IAddUser, IValidator, User, AddAccountDto } from './signup.protocols'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: IValidator
  addAcountStub: IAddUser
}

const makeAddAccount = (): IAddUser => {
  class AddAccountStub implements IAddUser {
    add (account: AddAccountDto): User {
      const accountMock = {
        id: 'someId',
        name: 'mock name',
        email: 'validemail@email.com',
        password: 'mock pasword'
      }
      return accountMock
    }
  }
  return new AddAccountStub()
}

const makeEmailValidator = (): IValidator => {
  class EmailValidatorStub implements IValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAcountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAcountStub)
  return {
    sut,
    emailValidatorStub,
    addAcountStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'mock email',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'mock name',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'mock email',
        name: 'mock name',
        passwordConfirmation: '123456'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if passwords don\'t match', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'mock email',
        name: 'mock name',
        password: '1234567',
        passwordConfirmation: '123456'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation', 'Passwords don\'t match'))
  })

  test('Should return 400 if invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: 'mock email',
        name: 'mock name',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email', 'invalid email address format'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        email: 'mock_email',
        name: 'mock name',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toBeCalledWith('mock_email')
  })

  test('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        email: 'mock_email',
        name: 'mock name',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError())
  })

  test('Should return 500 if AddAccount throws', () => {
    const { sut, addAcountStub } = makeSut()
    jest.spyOn(addAcountStub, 'add').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        email: 'mock_email',
        name: 'mock name',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError())
  })

  test('Should call AddAccount with correct values', () => {
    const { sut, addAcountStub } = makeSut()
    const addSpy = jest.spyOn(addAcountStub, 'add')
    const httpRequest = {
      body: {
        email: 'mock_email',
        name: 'mock name',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }
    sut.handle(httpRequest)
    expect(addSpy).toBeCalledWith({
      email: 'mock_email',
      name: 'mock name',
      password: '123456'
    })
  })

  test('Should return 200 if valid data is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'validemail@email.com',
        name: 'mock name',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      id: 'someId',
      name: 'mock name',
      email: 'validemail@email.com',
      password: 'mock pasword'
    })
  })
})
