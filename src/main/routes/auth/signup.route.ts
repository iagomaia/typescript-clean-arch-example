import {FastifyInstance} from 'fastify'
import { adaptRoute } from '../../adapters/fastify.adpter';
import { makeSignupController } from '../../factories/signup'

export default (app: FastifyInstance): void => {
  app.post('/auth/signup', adaptRoute(makeSignupController()))
}