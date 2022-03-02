import Fastify from 'fastify'
import { cors } from '../middlewares/cors'

const app = Fastify({logger: true})
cors(app)

export default app