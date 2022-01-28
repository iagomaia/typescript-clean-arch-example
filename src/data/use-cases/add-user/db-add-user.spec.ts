import { DbAddUser } from './db-add-user'
import { IEncrypter } from '../../protocols/encrypter'

interface SutTypes {
  sut: DbAddUser
  encrypterStub: IEncrypter
}
const makeEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
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
