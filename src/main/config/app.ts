import Fastify from 'fastify'
import setupRoutes from './routes'
import { cors } from '../middlewares/cors'

const app = Fastify({ logger: true })

cors(app)
setupRoutes(app)

export default app