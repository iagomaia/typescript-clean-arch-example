import { FastifyInstance, FastifyRegister } from "fastify";
import fg from 'fast-glob'

export default (app: FastifyInstance): void => {
  fg.sync('src/main/routes/**/*.route.ts').map(async file => (await import(`../../../${file}`)).default(app))
}