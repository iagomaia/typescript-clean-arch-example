import {FastifyInstance} from 'fastify'

export default (app: FastifyInstance): void => {
  app.post('/auth/signup', (req, rep) => {
    rep.status(201).send({ ok: true })
  })
}