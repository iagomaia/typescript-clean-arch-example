import env from './config/env'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo.helper'

MongoHelper.connect(env.mongoUrl).then(async () => {
  const app = (await import('./config/app')).default

  app.listen(env.port)
  .then(() => {
    console.log(`Server listening on http://localhost:${env.port}/`)
  })
  .catch(err => {
    console.error(err)
  })

})
