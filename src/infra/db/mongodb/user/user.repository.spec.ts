import { MongoHelper } from '../helpers/mongo.helper'
import { UserMongoRepository } from './user.repository'

describe('UserRepository for Mongo', () => {
  
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an User on success', async () => {
    const sut = new UserMongoRepository()
    const user = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.name).toBe('any_name')
    expect(user.email).toBe('any_email@email.com')
    expect(user.password).toBe('any_password')
  })
})
