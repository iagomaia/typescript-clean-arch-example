import { FastifyInstance } from "fastify";
import fastifyCors from "fastify-cors";

export const cors = (app: FastifyInstance) => {
  app.register(fastifyCors, {
    origin: '*'
  })
}