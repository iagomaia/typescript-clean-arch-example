import { MongoHelper } from "../../../infra/db/mongodb/helpers/mongo.helper"
import app from "../../config/app"

describe('Signup Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const usersCollection = await MongoHelper.collection('users')
    await usersCollection.deleteMany({})
  })

  test('Should return an User on success', async () => {
    const response = await app.inject({
      method: "post",
      url: "/auth/signup",
      payload: {
        name: 'Test User',
        email: 'user@test.com',
        password: 'user@test123',
        passwordConfirmation: 'user@test123'
      },
    })
    expect(response.statusCode).toBe(201)
  })
})
