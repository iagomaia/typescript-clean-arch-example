import { User } from '../models/user'

export interface AddAccountDto {
  name: string
  email: string
  password: string
}

export interface IAddUser {
  add: (account: AddAccountDto) => User
}
