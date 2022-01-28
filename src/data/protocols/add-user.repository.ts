import { AddUserDto } from '../../domain/use-cases/add-user'
import { User } from '../../domain/models/user'

export interface IAddUserRepository {
  add: (dto: AddUserDto) => Promise<User>
}
