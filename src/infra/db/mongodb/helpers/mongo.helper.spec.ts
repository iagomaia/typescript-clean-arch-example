import { MongoHelper as sut} from "./mongo.helper"

describe('Mongo Helper', () => {

  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let usersCollection = await sut.collection('users')
    expect(usersCollection).toBeTruthy()
    await sut.disconnect()
    usersCollection = await sut.collection('users')
    expect(usersCollection).toBeTruthy()
  })
})
