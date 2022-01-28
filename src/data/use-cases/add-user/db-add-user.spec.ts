import { DbAddUser } from './db-add-user'

describe('DbAddUser UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DbAddUser(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const userDto = {
      name: 'Valid Name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }
    await sut.add(userDto)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
