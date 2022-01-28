import { AddUserDto, IAddUser } from '../../../domain/use-cases/add-user'
import { User } from '../../../domain/models/user'
import { IEncrypter } from '../../protocols/encrypter'

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
