import { AddUserDto, IAddUser, IAddUserRepository, IEncrypter, User } from './db-add-user.protocols'

export class DbAddUser implements IAddUser {
  constructor (
    private readonly encrypter: IEncrypter,
    private readonly addUserRepository: IAddUserRepository
  ) {
  }

  async add (userDto: AddUserDto): Promise<User> {
    const password = await this.encrypter.encrypt(userDto.password)
    const user = await this.addUserRepository
      .add(
        Object.assign({}, userDto, { password })
      )
    return user
  }
}
