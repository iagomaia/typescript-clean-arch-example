import { IValidator } from '../presentation/protocols'

export class EmailValidatorAdapter implements IValidator {
  isValid (email: string): boolean {
    return false
  }
}
