import { AddUserDto, IAddUser, User, IEncrypter } from './db-add-user.protocols'

export class DbAddUser implements IAddUser {
  constructor (
    private readonly encrypter: IEncrypter
  ) {
  }

  async add (userDto: AddUserDto): Promise<User> {
    const hashedPassword = await this.encrypter.encrypt(userDto.password)
    return await new Promise<User>(resolve => resolve({
      id: '',
      name: '',
      email: '',
      password: hashedPassword
    }))
  }
}
