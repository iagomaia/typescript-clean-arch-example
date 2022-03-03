import { IController, IHttpRequest, IHttpResponse } from "../../presentation/protocols";
import env from "../config/env"
export class LogControllerDecorator implements IController {
  constructor(private readonly controller: IController) { }

  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    const response = await this.controller.handle(request)
    this.log({
      request,
      response
    })
    return response
  }

  private log(info: any) {
    const handlers = {
      "local": console.log
    }
    if (handlers[env.nodeEnv]) {
      handlers[env.nodeEnv](info)
    } else {
      console.log(info)
    }
  }


}