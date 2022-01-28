import bcrypt from 'bcrypt'
import { IEncrypter } from '../../data/protocols/encrypter'

export class BcryptAdapter implements IEncrypter {
  constructor (private readonly salt: number) {
  }

  async encrypt (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
