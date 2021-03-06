import { IController, IHttpRequest, IHttpResponse } from "../../presentation/protocols"
import { LogControllerDecorator } from "./log.decorator"
interface SutType {
  sut: LogControllerDecorator
  controllerStub: IController
}

const makeReq = (): IHttpRequest => {
  const req = {
    body: {
      email: 'any@mail.com',
      name: 'Any Name',
      password: 'any_pw',
      passwordConfirmation: 'any_pw'
    }
  }
  return req
}

const makeResp = (): IHttpResponse => {
  return {
    statusCode: 200,
    body: {
      name: 'any name'
    }
  }
}

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
      const httpResponse = makeResp()
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutType => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

describe('Log Controller Decorator', () => {
  test('Should call controller handle', async () => {
    const req = makeReq()
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(req)
    expect(handleSpy).toHaveBeenCalledWith(req)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const req = makeReq()
    const resp = await sut.handle(req)
    expect(resp).toEqual(makeResp())
  })
})
