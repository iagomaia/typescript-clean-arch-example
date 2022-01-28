import { DbAddUser } from './db-add-user'
import { AddUserDto, IAddUserRepository, IEncrypter, User } from './db-add-user.protocols'

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeAddUserRepository = (): IAddUserRepository => {
  class AddUserRepositoryStub implements IAddUserRepository {
    async add (addUserDto: AddUserDto): Promise<User> {
      const fakeUser = {
        id: 'valid_id',
        name: 'Valid Name',
        email: 'valid_email@email.com',
        password: 'hashed_password'
      }
      return await new Promise(resolve => resolve(fakeUser))
    }
  }

  return new AddUserRepositoryStub()
}

interface SutTypes {
  sut: DbAddUser
  encrypterStub: IEncrypter
  addUserRepositoryStub: IAddUserRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addUserRepositoryStub = makeAddUserRepository()
  return {
    sut: new DbAddUser(encrypterStub, addUserRepositoryStub),
    encrypterStub,
    addUserRepositoryStub
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
  test('Should throw if encrypter throws', async () => {
    const {
      sut,
      encrypterStub
    } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const userDto = {
      name: 'Valid Name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }
    const promise = sut.add(userDto)
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddUserRepository with correct values', async () => {
    const {
      sut,
      addUserRepositoryStub
    } = makeSut()
    const addSpy = jest.spyOn(addUserRepositoryStub, 'add')
    const userDto = {
      name: 'Valid Name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }
    await sut.add(userDto)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'Valid Name',
      email: 'valid_email@email.com',
      password: 'hashed_password'
    })
  })
})
