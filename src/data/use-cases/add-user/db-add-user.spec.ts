import { DbAddUser } from './db-add-user'
import { IEncrypter } from '../../protocols/encrypter'

interface SutTypes {
  sut: DbAddUser
  encrypterStub: IEncrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  const encrypterStub = new EncrypterStub()
  return {
    sut: new DbAddUser(encrypterStub),
    encrypterStub
  }
}

describe('DbAddUser UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const {
      sut,
      encrypterStub
    } = makeSut()
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
