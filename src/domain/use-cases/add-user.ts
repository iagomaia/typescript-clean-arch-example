import { User } from '../models/user'

export interface AddUserDto {
  name: string
  email: string
  password: string
}

export interface IAddUser {
  add: (account: AddUserDto) => Promise<User>
}
