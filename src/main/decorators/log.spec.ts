import { IController, IHttpRequest, IHttpResponse } from "../../presentation/protocols"
import { LogControllerDecorator } from "./log.decorator"

describe('Log Controller Decorator', () => {
  test('Should call controller handle', async () => {
    class ControllerStub implements IController {
      async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const httpResponse = {
          statusCode: 200,
          body: {
            name: 'any name'
          }
        }
        return new Promise(resolve => resolve(httpResponse))
      }
    }
    const controllerStub = new ControllerStub()
    const req = {
      body: {
        email: 'any@mail.com',
        name: 'Any Name',
        password: 'any_pw',
        passwordConfirmation: 'any_pw'
      }
    }
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    await sut.handle(req)
    expect(handleSpy).toHaveBeenCalledWith(req)
  })
})
