import { IController, IHttpRequest } from "../../presentation/protocols";
import { FastifyRequest, FastifyReply } from "fastify";


export const adaptRoute = (controller: IController) => {
  return async (req: FastifyRequest, rep: FastifyReply) => {
    const httpRequest: IHttpRequest = {
      body: req.body
    }
    const response = await controller.handle(httpRequest)
    rep.status(response.statusCode).send(response.body)
  }
}